const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const subsSchema = new Schema({
    email: {type: String, required: true, unique: true}
});

module.exports = model('Subs', subsSchema);