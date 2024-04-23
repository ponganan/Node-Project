const User = require('../models/user.model');
async function userInfo(req, res) {
    try {
        const userId = req.user.userId; // Access user ID from verified JWT token

        // Find user by ID using the retrieved user ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = userInfo;