const express = require('express');
const register = require('../controllers/register');
const login = require('../controllers/login')
// try new one , import as an object
const { refreshToken } = require('../controllers/refreshToken')


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/auth/refresh-token', refreshToken);

module.exports = router;