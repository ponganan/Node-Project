const express = require('express')
// after install mongoose for MongoDB connection
const mongoose = require('mongoose')
// after create models we have to import
const Product = require('./models/product.model')

const app = express()

//set express can use json
app.use(express.json())

// call default page
app.get('/', (req, res) => {
    //response from server
    res.send("Hello from NodeAPI install NodeMon");

})


// add data to mongoseDB use async because it take a time to update to database
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
mongoose.connect('mongodb+srv://joeyubu:go1x2ykt@backenddb.zfdyagg.mongodb.net/NodeAPITest?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => {
        console.log('Database Connected!')
        // if Database Connected
        // run server
        // start express on port 3000
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        })
    })
    // HAVE TO catch if DB can't connect    
    .catch(() => {
        console.log('Connection Failed!')
    })