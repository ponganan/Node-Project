const mongoose = require('mongoose')

const ProductScheme = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"],
            minlength: 1,
            maxlength: 50,
        },

        quantity: {
            type: Number,
            require: true,
            default: 0,
            min: 0, // Minimum quantity validation

        },
        price: {
            type: Number,
            require: true,
            default: 0,
            min: 0, // Minimum price validation
        },
        image: {
            type: String,
            require: false
        }
    },
    {
        timestamps: true
    }
)

// allow mongodb to use schema
const Product = mongoose.model("Product", ProductScheme);

// have to export
module.exports = Product;