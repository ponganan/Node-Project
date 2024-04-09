const express = require('express');
const createUser = require('../controllers/createUser');
const getUsers = require('../controllers/getUsers')
const getUserById = require('../controllers/getUserById');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');

const router = express.Router();

router.post('/api/users/', createUser);
router.get('/api/users/', getUsers);
router.get('/api/user/:id', getUserById);
//use put for update data
router.put('/api/user/:id', updateUser);
//delete user
router.delete('/api/user/:id', deleteUser);

module.exports = router;