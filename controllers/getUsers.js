const User = require('../models/user.model');

async function getUsers(req, res) {
    try {
        // Fetch all products from MongoDB
        const user = await User.find({});

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = getUsers;