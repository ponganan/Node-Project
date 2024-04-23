const express = require('express');
const createUser = require('../controllers/createUser');
const getUsers = require('../controllers/getUsers')
const getUserById = require('../controllers/getUserById');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');
//verifyJWT Middleware in Protected Routes
const verifyJWT = require('../middleware/auth.middleware');
const userInfo = require('../controllers/userInfo');


const router = express.Router();

router.post('/api/users/', createUser);
//verifyJWT Middleware
router.get('/api/users/', verifyJWT, getUsers);

//getUserById with out Auth
router.get('/api/user/:id', getUserById);

//get userInfo with JWT verify
router.get('/api/userinfo/', verifyJWT, userInfo);

//use put for update data
router.put('/api/user/:id', updateUser);

//delete user
router.delete('/api/user/:id', deleteUser);

module.exports = router;