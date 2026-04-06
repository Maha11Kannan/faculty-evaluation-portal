require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./models/Feedback');

const app = express();

app.use(cors({ 
  origin: ["http://localhost:3000", /\.vercel\.app$/],
  credentials: true 
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to facultyDB"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// GET: Fetch feedback for a specific faculty (Case-Insensitive)
app.get('/api/feedback/:facultyName', async (req, res) => {
  try {
    const name = req.params.facultyName;
    // This regex finds the lowercase "kannan" from your screenshot!
    const feedbacks = await Feedback.find({ 
      facultyName: { $regex: new RegExp("^" + name + "$", "i") } 
    });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Generic GET for all (optional)
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(200).send("Saved Successfully");
  } catch (err) {
    res.status(500).send("Save Failed");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on ${PORT}`));