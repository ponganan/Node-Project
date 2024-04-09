const User = require('../models/user.model'); // Replace with your user model path

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getUserById;