const User = require('../models/user.model');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const { generateRefreshToken, generateAccessToken } = require('../utils/utils');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        // include { select: 'password' } because use select: false,
        //const user = await User.findOne({ email }, { select: 'password' });
        //not correct by Gemini advice
        const user = await User.findOne({ email }).select('password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid user' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate access token using the new function
        const accessToken = generateAccessToken(user._id);

        // Generate refresh token 
        const refreshToken = generateRefreshToken(user._id);

        // Create JWT payload
        //  const payload = { userId: user._id };

        // Generate JWT token (consider using a stronger secret key in production)
        // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3600s' }); // Token expires in 1 hour



        // Set HttpOnly cookies with expiry times

        //  res.setHeader('Set-Cookie', [
        // set 1 hour Adding the secure Flag to use HTTPS

        //  `accessToken=${accessToken}; HttpOnly; Secure; Max-Age=3600; Path=/`,

        // set 1 day Adding the secure Flag to use HTTPS
        //`refreshToken=${refreshToken}; HttpOnly; Secure; Max-Age=86400; Path=/`         
        //  ]);

        // Set HttpOnly cookies with expiry times and secure flag
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: false, maxAge: 60, path: '/' }); // 3600 seconds = 1 min
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 86400, path: '/' }); // 86400 seconds = 1 day

        // Send response with both tokens
        res.json({ message: 'Login successful', accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = login;
