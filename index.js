//install the dotenv package to load environment
//npm install dotenv
require('dotenv').config();

const express = require('express')
// after install mongoose for MongoDB connection
const mongoose = require('mongoose')
// after create models we have to import
const Product = require('./models/product.model.js')

const app = express()

// set parse requests of content-type - application/json
app.use(express.json())

// call default page
app.get('/', (req, res) => {
    //response from server
    res.send("Hello from NodeAPI install NodeMon update time : 23.34");

})

//view product from mongoDB

app.get('/api/products/', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

////get product by ID from mongoDB
app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

// add data to mongoDB use async because it take a time to update to database
app.post('/api/products', async (req, res) => {
    try {
        // after import models(Product)
        const product = await Product.create(req.body);
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })

    }

})

// connect MongoDB after import Mongoose
// use connect string from MongoDB Atlas 
// ...use collection name after mongodb.net/xxxxxx?  
// mongodb.net/NodeAPITest? 

const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString)
    .then(() => {
        console.log('Database Connected!')
        console.log('Connect by used .env')

        // if Database Connected
        // run server
        // start express on port 3000

        app.listen(3000, () => {
            console.log('Server running on port 3000');
        })
    })
    // HAVE TO catch if DB can't connect
    .catch(err => {
        console.log('Connection Failed!')
        console.error(err)
    });
