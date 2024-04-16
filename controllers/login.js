const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        // include { select: 'password' } because use select: false,
        //const user = await User.findOne({ email }, { select: 'password' });
        //not correct by Gemini advice
        const user = await User.findOne({ email }).select('password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid user' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create JWT payload
        const payload = { userId: user._id };

        // Generate JWT token (consider using a stronger secret key in production)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3600s' }); // Token expires in 1 hour

        res.json({ message: 'Login successful', token }); // Send the generated token in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = login;
