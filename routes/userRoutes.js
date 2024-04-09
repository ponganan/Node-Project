const express = require('express');
const userController = require('../controllers/createUser'); // Assuming correct path

const router = express.Router();

router.post('/api/users/', userController.createUser);

module.exports = router;