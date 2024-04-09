const Product = require('../models/product.model');

async function getProductById(req, res) {
    try {
        const { id } = req.params;

        // Validate the ID format (optional)
        // You can use Mongoose validation or a separate library for validation

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = getProductById;