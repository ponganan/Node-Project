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

        // Set HttpOnly cookies with expiry times and secure flag
        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: false, maxAge: 60, path: '/' }); // 3600 seconds = 1 min
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: false, maxAge: 86400, path: '/' }); // 86400 seconds = 1 day

        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
}
module.exports = { refreshToken };
