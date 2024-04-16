require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Server } = require('socket.io'); // Import for Socket.IO

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON data

const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString)
    .then(() => {
        console.log('Database Connected!')
        console.log('Connect by used .env')

        // if Database Connected
        // run server
        // start express on port 3000

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });


        // app.listen(3000, () => {
        //     console.log('Server running on port 3000');
        // })
    })
    // HAVE TO catch if DB can't connect
    .catch(err => {
        console.log('Connection Failed!')
        console.error(err)
    });


const messageSchema = new mongoose.Schema({
    user: String,
    message: String,
    timestamp: Date,
});

const Message = mongoose.model('Message', messageSchema); // Create message model

// API endpoint (GET) to fetch chat history
app.get('/chat', (req, res) => {
    Message.find({})
        .then(messages => res.json(messages)) // Send retrieved messages on success
        .catch(err => res.status(500).json({ error: err.message })); // Handle errors
});




app.post('/chat', async (req, res) => {
    try {
        if (!req.body.user) {
            return res.status(400).json({ error: 'Missing user field in request body' });
        }

        const newMessage = new Message({ user: req.body.user, message: req.body.message, timestamp: new Date() });
        await newMessage.save();
        res.json({ message: 'Message received' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





// API endpoint (POST) to receive new messages (use Socket.IO for real-time)
app.post('/chat', (req, res) => {
    const { user, message } = req.body;

    // Validate message data (optional)

    const newMessage = new Message({ user, message, timestamp: new Date() });

    newMessage.save((err) => { // Save message to MongoDB
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Broadcast the message using Socket.IO
        io.emit('new_message', newMessage); // Emit the message object

        res.json({ message: 'Message received' });
    });
});

// Socket.IO integration
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected!');

    // Handle events from the client (e.g., 'send_message')
    socket.on('send_message', (data) => {
        console.log('Received message:', data);

        // Store message in MongoDB (already handled in POST request)
        // ... (no need for additional logic here)

        // Broadcast the message to all connected clients
        io.emit('new_message', data);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

