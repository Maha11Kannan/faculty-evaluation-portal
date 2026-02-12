const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./models/Feedback');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your MongoDB URI
mongoose.connect('mongodb://localhost:27017/universityDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// POST: Store student feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(200).send("Feedback Saved");
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET: Send feedback back to the frontend
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));