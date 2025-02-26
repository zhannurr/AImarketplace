const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Token = require("../models/Token"); // Добавили модель для refresh token
const router = express.Router();
require("dotenv").config();



router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("surname").notEmpty().withMessage("Surname is required"),
        body("email").isEmail().withMessage("Invalid email"),

        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, surname, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({ name, surname, email, password: hashedPassword });
            await user.save();

            // Создаем токены
            const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

            // Сохраняем refreshToken в базе
            await new Token({ userId: user.id, token: refreshToken }).save();

            res.status(201).json({ accessToken, refreshToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Создаем токены
            const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

            // Сохраняем refreshToken в базе
            await new Token({ userId: user.id, token: refreshToken }).save();

            res.json({ accessToken, refreshToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

router.post("/logout", async (req, res) => {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token required" });
    }

    try {
        await Token.findOneAndDelete({ token: refreshToken });
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token required" });
    }

    try {
        const storedToken = await Token.findOne({ token: refreshToken });
        if (!storedToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid refresh token" });

            const newAccessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
