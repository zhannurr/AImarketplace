const express = require("express");
const Manufacturer = require("../models/manufacturer");
const router = express.Router();

router.get('/manufacturers', async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find();
        res.json(manufacturers);
    } catch (err) {
        res.status(500).send('Error fetching manufacturers');
    }
});

router.post('/manufacturers', async (req, res) => {
    try {
        const { name, country, foundation_year, website } = req.body;
        const newManufacturer = new Manufacturer({ name, country, foundation_year, website });
        await newManufacturer.save();
        res.status(201).json(newManufacturer);
    } catch (err) {
        res.status(500).send('Error adding manufacturer');
    }
});

router.get('/manufacturers/:id', async (req, res) => {
    try {
        const manufacturer = await Manufacturer.findById(req.params.id);
        if (!manufacturer) return res.status(404).send('Manufacturer not found');
        res.json(manufacturer);
    } catch (err) {
        res.status(500).send('Error retrieving manufacturer');
    }
});

router.put('/manufacturers/:id', async (req, res) => {
    try {
        const updatedManufacturer = await Manufacturer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedManufacturer);
    } catch (err) {
        res.status(500).send('Error updating manufacturer');
    }
});

router.delete('/manufacturers/:id', async (req, res) => {
    try {
        await Manufacturer.findByIdAndDelete(req.params.id);
        res.send('Manufacturer deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting manufacturer');
    }
});

module.exports = router;