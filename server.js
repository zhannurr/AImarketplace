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
},  { toJSON: { virtuals: false }, toObject: { virtuals: false } }
);

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









// Model Schema
const modelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    manufacturer_id: { type: String, required: true },
  }, { toJSON: { virtuals: false }, toObject: { virtuals: false } });
  
  const Model = mongoose.model('Model', modelSchema);
  
  // Routes
  app.get('/models', async (req, res) => {
    try {
      const models = await Model.find();
      res.json(models);
    } catch (err) {
      res.status(500).send('Error fetching models');
    }
  });
  
  app.post('/models', async (req, res) => {
    try {
      const { name, country, year, description, manufacturer_id } = req.body;
      const newModel = new Model({ name, country, year, description, manufacturer_id });
      await newModel.save();
      res.status(201).json(newModel);
    } catch (err) {
      res.status(500).send('Error adding model');
    }
  });
  
  app.get('/models/:id', async (req, res) => {
    try {
      const model = await Model.findById(req.params.id);
      if (!model) return res.status(404).send('Model not found');
      res.json(model);
    } catch (err) {
      res.status(500).send('Error retrieving model');
    }
  });
  
  app.put('/models/:id', async (req, res) => {
    try {
      const updatedModel = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedModel);
    } catch (err) {
      res.status(500).send('Error updating model');
    }
  });
  
  app.delete('/models/:id', async (req, res) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.send('Model deleted successfully');
    } catch (err) {
      res.status(500).send('Error deleting model');
    }
  });






// Manufacturer Schema
const manufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    foundation_year: { type: Number, required: true },
    website: { type: String },
  }, { toJSON: { virtuals: false }, toObject: { virtuals: false } });
  
  const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);
  
  // Routes
  app.get('/manufacturers', async (req, res) => {
    try {
      const manufacturers = await Manufacturer.find();
      res.json(manufacturers);
    } catch (err) {
      res.status(500).send('Error fetching manufacturers');
    }
  });
  
  app.post('/manufacturers', async (req, res) => {
    try {
      const { name, country, foundation_year, website } = req.body;
      const newManufacturer = new Manufacturer({ name, country, foundation_year, website });
      await newManufacturer.save();
      res.status(201).json(newManufacturer);
    } catch (err) {
      res.status(500).send('Error adding manufacturer');
    }
  });
  
  app.get('/manufacturers/:id', async (req, res) => {
    try {
      const manufacturer = await Manufacturer.findById(req.params.id);
      if (!manufacturer) return res.status(404).send('Manufacturer not found');
      res.json(manufacturer);
    } catch (err) {
      res.status(500).send('Error retrieving manufacturer');
    }
  });
  
  app.put('/manufacturers/:id', async (req, res) => {
    try {
      const updatedManufacturer = await Manufacturer.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedManufacturer);
    } catch (err) {
      res.status(500).send('Error updating manufacturer');
    }
  });
  
  app.delete('/manufacturers/:id', async (req, res) => {
    try {
      await Manufacturer.findByIdAndDelete(req.params.id);
      res.send('Manufacturer deleted successfully');
    } catch (err) {
      res.status(500).send('Error deleting manufacturer');
    }
  });





// Start the Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
