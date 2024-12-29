// shprtcut steps : Mentorship session 1
// STEP 1: Import Required Modules
const express = require('express'); // Node.js framework for building web apps and APIs
const mongoose = require('mongoose'); // ODM (Object Document Mapper) to interact with MongoDB through JavaScript objects

// STEP 2: Initialize Express
const app = express();
app.use(express.json()); // Middleware to parse incoming JSON requests

const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// STEP 3: Import the News Model
const NewsModel = require('./models/news'); // Import the `news.js` model file in the `models` folder

// STEP 4: Define the Routes

// 1. Root Route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the News API!" });
});

// 2. Add News (POST)
app.post('/api/addnews', async (req, res) => {
    try {
        const news = await NewsModel.create(req.body); // Create and save a new document in MongoDB
        res.status(200).json(news); // Return success response
        console.log(req.body);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle error
    }
});

// 3. Fetch All News (GET)
app.get('/api/news', async (req, res) => {
    try {
        const news = await NewsModel.find({}); // Fetch all documents
        res.status(200).json(news); // if fetching successful
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Fetch News by ID (GET)
app.get('/api/news/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        const news = await NewsModel.findById(id); // Fetch the document by ID
        if (!news) {
            return res.status(404).json({ message: 'News not found' }); // in case news not found
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Update News by ID (PUT)
app.put('/api/news/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        const news = await NewsModel.findByIdAndUpdate(id, req.body, { new: true }); // Update and return the updated document
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. Delete News by ID (DELETE)
app.delete('/api/news/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        const news = await NewsModel.findByIdAndDelete(id); // Delete the document
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// STEP 5: Connect to MongoDB (Directly using the URI)
const MONGO_URI = "mongodb+srv://hansika_24:nna289WFotvDxMN0@cluster0.webcm.mongodb.net/";
console.log('MONGO_URI:', MONGO_URI); // Check if the URI is correctly loaded

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

// STEP 6: Start the Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
