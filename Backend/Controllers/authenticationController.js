import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import generateJWT from "../Utils/generateJWT.js";

export const signup = async (req, res) => {
    console.log(req);
    try {
        const { firstName, lastName, username, email, password } = req.body;
        const query = {
            username: username,
            email: email,
        };

        // Search in DB for user and email infos
        const user =
            (await User.find({ username: query.username })) ||
            User.find({ email: query.email });

        if (user) {
            return res.status(400).json({
                error: `User with username- ${username} and email- ${email} already exists! Either Login or choose a different field`,
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(30);
        const hashedPwd = await bcrypt.hash(password, salt);

        const defaultProfilePic = `https://avatar.iran.liara.run/username?username=[${firstname}+${lastName}]`;
        const userData = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPwd,
            profilePicture: defaultProfilePic,
        };

        const registeredUser = new User(userData);

        if (registeredUser) {
            await registeredUser.save();

            generateJWT(registeredUser._id, res);

            delete userData.password;
            return res.status(201).json({
                _id: registeredUser._id,
                userData: userData,
            });
        } else {
            return res.status(400).json({ error: "User data found invalid!" });
        }
    } catch (error) {
        console.log("Error in Signup Controller: ", error.message);
        return res.status(500).json({
            error: "Server Error: Internal error occurred during sign up!",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = {
            username: username,
        };
        const user = User.findOne(query);

        if (user) {
            const correctPwd = await bcrypt.compare(password, user.password);
            if (!correctPwd) {
                return res
                    .status(404)
                    .json({ error: `Invalid password! Please type again` });
            }

            generateJWT(user._id, res);

            return res.status(200).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
            });
        } else {
            return res.status(404).json({
                error: `User with username- ${username} is not registered! Please Signup first to login`,
            });
        }
    } catch (error) {
        console.log("Error in Login Controller: ", error.message);
        return res.status(500).json({
            error: "Server Error: Internal error occurred during login!",
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
        console.log("Error in Logout Controller", error.message);
        return res.status(500).json({
            error: "Server Error: Internal error occurred during logout!",
        });
    }
};
