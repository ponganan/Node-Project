const Product = require('../models/product.model');

async function getProducts(req, res) {
    try {
        const products = await Product.find({});  // Fetch all products from MongoDB
        if (!products) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(products);          // Send products as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });  // Handle database errors
    }
}

module.exports = getProducts;