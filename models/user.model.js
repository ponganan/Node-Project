const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Please enter your name'] },
        email: { type: String, required: false, unique: true }, // Assuming email is unique for users
        password: { type: String, required: false },
    },
    {
        timestamps: true
    }

);

const User = mongoose.model('User', userSchema);

module.exports = User;