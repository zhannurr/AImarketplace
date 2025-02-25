require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Car = require('./models/car');
const Model = require('./models/model');
const Manufacturer = require('./models/manufacturer');

const app = express();

const carRoutes = require('./routes/carRoutes');
const modelRoutes = require('./routes/modelRoutes');
const manufacturerRoutes = require("./routes/manufacturerRoutes");
const frontendRoutes = require("./routes/frontendRoutes");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", carRoutes);
app.use("/api", modelRoutes);
app.use("/api", manufacturerRoutes);
app.use("/", frontendRoutes);

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


// Start the Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
