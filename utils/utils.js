const jwt = require('jsonwebtoken');

// Function to generate a refresh token
function generateRefreshToken(userId) {
    // Create payload for refresh token (include userId)
    const payload = { userId };

    // Use a different secret key for refresh tokens (stored securely in environment)
    const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

    // Set appropriate expiration time for refresh tokens (longer than access token)
    const options = { expiresIn: '1d' }; // Example: Refresh token expires in 1 days

    // Generate the refresh token using JWT
    const refreshToken = jwt.sign(payload, refreshTokenSecret, options);

    return refreshToken;
}

// Function to generate an access token
function generateAccessToken(userId) {
    // Create payload for access token (include userId)
    const payload = { userId };

    // Use the main JWT secret key (stored securely in environment)
    const accessTokenSecret = process.env.JWT_SECRET;

    // Set appropriate expiration time for access tokens (shorter than refresh token)
    const options = { expiresIn: '3600s' }; // Example: Access token expires in 1 hour

    // Generate the access token using JWT
    const accessToken = jwt.sign(payload, accessTokenSecret, options);

    return accessToken;
}

module.exports = { generateRefreshToken, generateAccessToken };
