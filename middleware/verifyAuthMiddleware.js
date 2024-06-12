const jwt = require('jsonwebtoken');

const verifyAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check for authorization header and Bearer prefix
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token using utils.js
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user information to request object
        next(); // Proceed to the route handler if token is valid
    } catch (err) {
        console.error('Error verifying token:', err);
        // Handle specific errors (e.g., expired token, invalid signature)
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            // Handle other errors (e.g., logging)
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = verifyAuthMiddleware;