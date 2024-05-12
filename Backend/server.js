import express from "express";
import dotenv from "dotenv";
import authenticationRouter from "./Routers/Authentication.js";
import connectMongoDB from "./Database-Drivers/connectMonogoDB.js";
import messagingRouter from "./Routers/Message.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routers/User.js";
import { app, server } from "./socket.js";
import requestRouter from "./Routers/Request.js";
import friendsRouter from "./Routers/Friends.js";

// Server Configs
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Server is runnning");
});

// Route Handlers
app.use("/api/auth", authenticationRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messagingRouter);
app.use("/api/request", requestRouter);
app.use("/api/friends", friendsRouter);

// Start Server on default PORT
server.listen(PORT, async () => {
    await connectMongoDB();
    console.log(`Running on PORT -> ${PORT}`);
});
