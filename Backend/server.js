import path from "path";
import dotenv from "dotenv";
import express from "express";
import client from "prom-client";
import { createLogger } from "winston";
import LokiTransport from "winston-loki";
import cookieParser from "cookie-parser";
import responseTime from "response-time";
import { app, server } from "./socket.js";
import userRouter from "./Routers/User.js";
import requestRouter from "./Routers/Request.js";
import friendsRouter from "./Routers/Friends.js";
import messagingRouter from "./Routers/Message.js";
import authenticationRouter from "./Routers/Authentication.js";
import connectMongoDB from "./Database-Drivers/connectMonogoDB.js";

// Server Configs
dotenv.config();

const options = {
    labels: {
        appName: "pistagram-server",
    },
    transports: [
        new LokiTransport({
            host: "http://192.168.0.109:3100",
            labels: { app: "pistagram" },
            onConnectionError: (error) => {
                console.log(
                    `Connection to loki logger broke due to ${error.name} because of ${error.message}`
                );
            },
        }),
    ],
};

const __dirname = path.resolve();
export const LOGGER = createLogger(options);
const PORT = process.env.PORT || 8000;

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const totalRequestCounter = new client.Counter({
    name: "total_requests",
    help: "Counts total requests landed on the server",
});

const totalSuccessfullResponseCounter = new client.Counter({
    name: "total_successfull_response",
    help: "Counts total successfull responses given by the server",
});

const totalErrorResponseCounter = new client.Counter({
    name: "total_error_response",
    help: "Counts total error responses given by the server",
});

const requestResponseTime = new client.Histogram({
    name: "request_response_time",
    help: "Time to serve a request by express server in ms",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10, 20, 40, 80, 200, 500, 1000],
});

// Middlewares for prometheus, json and cookies
app.use(express.json());
app.use(cookieParser());

app.use(
    responseTime((req, res, time) => {
        totalRequestCounter.inc();
        requestResponseTime
            .labels({
                method: req.method,
                route: req.url,
                status_code: res.statusCode,
            })
            .observe(time);

        const statusCode = res.statusCode.toString();
        if (statusCode?.startsWith("2")) {
            totalSuccessfullResponseCounter.inc();
        } else {
            totalErrorResponseCounter.inc();
        }
    })
);

app.use(express.static(path.join(__dirname, "Frontend", "dist")));

// Route Handlers
app.get("/", (req, res) => {
    res.send("Server is runnning");
});

app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType);

    const metrics = await client.register.metrics();
    res.send(metrics);
});

app.use("/api/auth", authenticationRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messagingRouter);
app.use("/api/request", requestRouter);
app.use("/api/friends", friendsRouter);

app.get("*", (req, res) => {
    LOGGER.info("Request came to get frontend build files");
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

// Start Server on default PORT
server.listen(PORT, async () => {
    console.log(`Running on PORT -> ${PORT} now connecting to MONGODB`);
    LOGGER.info(
        `Server - Running on PORT -> ${PORT} now connecting to MONGODB`
    );
    await connectMongoDB();
});
