const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  facultyName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  // FIX: Change this to 'date' to match your 17 old documents in MongoDB
  date: { type: Date, default: Date.now } 
}, { 
  collection: 'feedbacks' // Force it to stay connected to your 17 documents
});

module.exports = mongoose.model('Feedback', feedbackSchema);