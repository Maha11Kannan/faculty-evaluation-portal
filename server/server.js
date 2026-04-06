require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./models/Feedback');

const app = express();

// 1. UPDATED CORS: This allows ANY Vercel link (and localhost) to connect.
// This is the "Emergency Key" for your review tomorrow!
app.use(cors({ 
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));

app.use(express.json());

// 2. HEALTH CHECK
app.get('/', (req, res) => {
  res.send("Backend is officially running and connected!");
});

// 3. DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to facultyDB"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// GET: Fetch feedback for a specific faculty
app.get('/api/feedback/:facultyName', async (req, res) => {
  try {
    const name = req.params.facultyName;
    const feedbacks = await Feedback.find({ 
      facultyName: { $regex: new RegExp("^" + name + "$", "i") } 
    });
    res.json(feedbacks);
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ error: "Server Error fetching faculty data" });
  }
});

// GET: Fetch all feedbacks
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    console.error("Fetch All Error:", err);
    res.status(500).json({ error: "Error fetching all feedback" });
  }
});

// POST: Save new feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(200).send("Saved Successfully");
  } catch (err) {
    console.error("Save Error:", err);
    // This sends a specific error back to the frontend
    res.status(500).json({ error: "Database save failed", details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));