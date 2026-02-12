const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  facultyName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } // This tracks when the student gave feedback
});

module.exports = mongoose.model('Feedback', feedbackSchema);