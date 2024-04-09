//install the dotenv package to load environment
//npm install dotenv
require('dotenv').config();

const express = require('express')
// after install mongoose for mongoose connection
const mongoose = require('mongoose')

// routes for product
const productRoutes = require('./routes/productRoutes');
//routers for user
const userRouters = require('./routes/userRoutes')

const app = express()

// set parse requests of content-type - application/json
app.use(express.json())

// call default page
app.get('/', (req, res) => {
    //response from server
    res.send("Hello from NodeAPI install NodeMon update time : 23.34");
    //res.redirect('https://www.ponganan.com');
})

//can use both GET and POST methods within the same route
//use '/' for root directory
app.use('/', productRoutes);

//routes to userRouters
app.use('/', userRouters);

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
