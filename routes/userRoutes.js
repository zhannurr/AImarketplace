const express = require("express");
const {checkToken, checkAdmin} = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

router.get("/profile", checkToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/profile", checkToken, async (req, res) => {
    const { name, surname, username, email } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = name || user.name;
        user.surname = surname || user.surname;
        user.username = username || user.username;
        user.email = email || user.email;
        await user.save();

        res.json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;