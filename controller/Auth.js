const User = require("../model/User");
const jwt = require("jsonwebtoken");
// const { options } = require("../routes/user");
const bcrypt = require("bcrypt");

require("dotenv").config();

exports.signUp = async (req, res) => {
    try {
        // get data 
        const { name, email, password, role } = req.body;
        // validation 
        const userExit = await User.findOne({ email });

        if (userExit) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        // passWord encryption 
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "password encryption failed"
            })
        }

        //creation db entry 
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",

        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role
            };

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            res.cookie("khalidCookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User Logged in successfully',
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: "Login failure"
        });
    }
};
