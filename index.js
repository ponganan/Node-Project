//install the dotenv package to load environment
//npm install dotenv
require('dotenv').config();

const express = require('express')
// after install mongoose for MongoDB connection
const mongoose = require('mongoose')
// after create models we have to import
const Product = require('./models/product.model.js')
//imports the getProducts function from the getProducts.js
const getProducts = require('./controllers/getProducts');
//imports the getProductsById function 
const getProductById = require('./controllers/getProductById')
//imports the createProduct function 
const createProduct = require('./controllers/createProduct');

const app = express()

// set parse requests of content-type - application/json
app.use(express.json())

// call default page
app.get('/', (req, res) => {
    //response from server
    res.send("Hello from NodeAPI install NodeMon update time : 23.34");
    //res.redirect('https://www.ponganan.com');
})

//view all product from mongoDB
app.get('/api/products/', getProducts);
//get product by ID from mongoDB
app.get('/api/product/:id', getProductById);
// add data to mongoDB use async because it take a time to update to database
app.post('/api/products/', createProduct);

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
