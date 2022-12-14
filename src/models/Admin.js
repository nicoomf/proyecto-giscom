const mongoose = require('mongoose');
const { Schema, model} = mongoose;
const bcrypt = require('bcryptjs');

const adminSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
}, {
    timestamps: true
});

adminSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

adminSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('Admin', adminSchema);