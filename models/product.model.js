const mongoose = require('mongoose')

const ProductScheme = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },

        quantity: {
            type: Number,
            require: true,
            default: 0
        },
        price: {
            type: Number,
            require: true,
            default: 0
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