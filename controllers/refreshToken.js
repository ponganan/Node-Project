const jwt = require('jsonwebtoken');
const { generateRefreshToken, generateAccessToken } = require('../utils/utils');

async function refreshToken(req, res) {
    const refreshToken = req.body.refreshToken;

    // Validation using jsonwebtoken
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const userId = decoded.userId; // Extract user ID from payload (if present)
        // ... further validation logic

        // Generate new access token
        const newAccessToken = generateAccessToken(userId);

        // Optionally generate new refresh token
        const newRefreshToken = generateRefreshToken(userId);

        res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
}
module.exports = { refreshToken };
