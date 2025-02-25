require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'web')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Car Schema
const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  model_id: { type: String, required: true },
});

const Car = mongoose.model('Car', carSchema);

// Routes
app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).send('Error fetching cars');
  }
});

app.post('/cars', async (req, res) => {
  try {
    const { make, price, color, model_id } = req.body;
    const newCar = new Car({ make, price, color, model_id });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).send('Error adding car');
  }
});

app.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.json(car);
  } catch (err) {
    res.status(500).send('Error retrieving car');
  }
});

app.put('/cars/:id', async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCar);
  } catch (err) {
    res.status(500).send('Error updating car');
  }
});

app.delete('/cars/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.send('Car deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting car');
  }
});

// Start the Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
