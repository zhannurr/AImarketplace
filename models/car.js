const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
        make: { type: String, required: true },
        price: { type: Number, required: true },
        color: { type: String, required: true },
        model_id: { type: String, required: true },
    },  { toJSON: { virtuals: false }, toObject: { virtuals: false } }
);

const Car = mongoose.model('Car', carSchema);

module.exports = Car