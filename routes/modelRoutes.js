const Model = require("../models/model");
const express = require("express");
const router = express.Router();

router.get('/models', async (req, res) => {
    try {
        const models = await Model.find();
        res.json(models);
    } catch (err) {
        res.status(500).send('Error fetching models');
    }
});

router.post('/models', async (req, res) => {
    try {
        const { name, country, year, description, manufacturer_id } = req.body;
        const newModel = new Model({ name, country, year, description, manufacturer_id });
        await newModel.save();
        res.status(201).json(newModel);
    } catch (err) {
        res.status(500).send('Error adding model');
    }
});

router.get('/models/:id', async (req, res) => {
    try {
        const model = await Model.findById(req.params.id);
        if (!model) return res.status(404).send('Model not found');
        res.json(model);
    } catch (err) {
        res.status(500).send('Error retrieving model');
    }
});

router.put('/models/:id', async (req, res) => {
    try {
        const updatedModel = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedModel);
    } catch (err) {
        res.status(500).send('Error updating model');
    }
});

router.delete('/models/:id', async (req, res) => {
    try {
        await Model.findByIdAndDelete(req.params.id);
        res.send('Model deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting model');
    }
});

module.exports = router;