const express = require("express");
const Car = require("../models/car");
const {checkToken, checkAdmin} = require("../middleware/authMiddleware");
const router = express.Router();

router.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).send('Error fetching cars');
    }
});

router.post('/cars', async (req, res) => {
    try {
        const { make, price, color, model_id } = req.body;
        const newCar = new Car({ make, price, color, model_id });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (err) {
        res.status(500).send('Error adding car');
    }
});

router.get('/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).send('Car not found');
        res.json(car);
    } catch (err) {
        res.status(500).send('Error retrieving car');
    }
});

router.put('/cars/:id', checkToken, checkAdmin, async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCar);
    } catch (err) {
        res.status(500).json({message: 'Error updating car'});
    }
});

router.delete('/cars/:id', checkToken, checkAdmin, async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({message: 'Car deleted successfully'});
    } catch (err) {
        res.status(500).json({message:'Error deleting car'});
    }
});

module.exports = router;