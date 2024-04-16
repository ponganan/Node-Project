const User = require('../models/user.model');
//const bcrypt = require('bcrypt');


async function register(req, res) {
    try {
        // Fetch all products from MongoDB
        const { username, email, password } = req.body;
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password before saving the user
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Send success response
        res.status(201).json({ message: 'User created successfully' });



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = register;
