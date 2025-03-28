const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    certificate: { type: String, required: true },
    photo: { type: String, required: true },
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
