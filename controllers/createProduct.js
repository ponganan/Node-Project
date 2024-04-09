const Product = require('../models/product.model');

async function createProduct(req, res) {
    try {
        const newProduct = new Product(req.body); // Create a new product object

        // Optional data validation (consider using a library like Joi)
        // You can validate the required fields and data types here

        const savedProduct = await newProduct.save(); // Save the new product to MongoDB

        res.status(201).json(savedProduct); // Send a Created (201) response
    } catch (error) {
        res.status(400).json({ message: error.message }); // Handle validation errors
    }
}

module.exports = createProduct;