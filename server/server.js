require('dotenv').config(); // Loads variables from your .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./models/Feedback');

const app = express();

// Middleware
// Restricts access to only your React frontend for better security
app.use(cors({ origin: "http://localhost:3000" })); 
app.use(express.json());

// MongoDB Connection
// Uses the URI from your .env file to connect to the mahalakshmikannan cluster
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => {
    console.log("❌ Database Connection Error:");
    console.error(err);
  });

// POST: Store student feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(200).send("Feedback Saved Successfully");
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).send("Error saving data to database");
  }
});

// GET: Send feedback back to the frontend
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).send("Error retrieving data");
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});