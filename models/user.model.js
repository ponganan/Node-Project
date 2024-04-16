const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter your name'],
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        }, // unique: true, Assuming email is unique for users
        password: {
            type: String,
            required: true,
            // minlength: 6,
            select: false, // Don't include password in user object retrieval
        },
    },

);
//Hash password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;