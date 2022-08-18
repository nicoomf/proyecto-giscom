const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const subsSchema = new Schema({
    // nombre: {type: String, required: true},
    // apellido: {type: String, required: true},
    email: {type: String, required: true, unique: true}
});

module.exports = model('Subs', subsSchema);