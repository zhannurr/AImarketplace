const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    foundation_year: { type: Number, required: true },
    website: { type: String },
}, { toJSON: { virtuals: false }, toObject: { virtuals: false } });

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;