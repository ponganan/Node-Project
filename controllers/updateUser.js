const User = require('../models/user.model'); // Replace with your user model path

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //recheck from database again by query
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = updateUser;