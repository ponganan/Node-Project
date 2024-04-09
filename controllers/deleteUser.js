const User = require('../models/user.model'); // Replace with your user model path

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json("User deleted successfully");

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = deleteUser;