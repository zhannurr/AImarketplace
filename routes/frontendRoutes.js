const express = require("express");
const path = require('path');
const router = express.Router();

router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
})

router.get("/cars", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/cars.html"));
})

router.get("/manufacturer", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/manufacturer.html"));
})

router.get("/model", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/model.html"));
})

router.get("/signin", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
})

router.get("/signup", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
})

module.exports = router;