const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    manufacturer_id: { type: String, required: true },
}, { toJSON: { virtuals: false }, toObject: { virtuals: false } });

const Model = mongoose.model('Model', modelSchema);

module.exports = Model