const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  facultyName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  // MATCH THE IMAGE: Use 'date' instead of 'createdAt'
  date: { type: Date, default: Date.now } 
}, { 
  // MATCH THE IMAGE: Use the lowercase plural name from your screenshot
  collection: 'feedbacks' 
});

module.exports = mongoose.model('Feedback', feedbackSchema);