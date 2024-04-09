const express = require('express');
//create product
const createProduct = require('../controllers/createProduct');
// Import getProducts
const getProducts = require('../controllers/getProducts');
// get product by ID
const getProductById = require('../controllers/getProductById');

const router = express.Router();

router.post('/api/products/', createProduct);
//for get all product
router.get('/api/products/', getProducts);
//for get product by ID
router.get('/api/product/:id', getProductById);

module.exports = router;

