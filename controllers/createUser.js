const User = require('../models/user.model');

async function createUser(req, res) {
    try {
        const newUser = User(req.body);
        // Save the new product to MongoDB
        const saveUser = await newUser.save();

        // Send a Created (201) response
        res.status(201).json(saveUser);
    } catch (error) {
        // Handle validation errors
        res.status(400).json({ message: error.message });
    }
}

module.exports = createUser;