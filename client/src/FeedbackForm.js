import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ studentName: '', facultyName: '', rating: '', comment: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', formData);
      alert("Feedback Submitted Successfully! ✨");
      setFormData({ studentName: '', facultyName: '', rating: '', comment: '' });
    } catch (err) {
      alert("Database error. Please try again.");
    }
  };

  return (
    <div className="glass-card">
      <h2>Send Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Student Name</label>
          <input type="text" placeholder="Your name" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} required />
        </div>
        <div className="input-group">
          <label>Faculty Name</label>
          <input type="text" placeholder="Enter faculty name" value={formData.facultyName} onChange={(e) => setFormData({...formData, facultyName: e.target.value})} required />
        </div>
        <div className="input-group">
          <label>Rating</label>
          <select value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} required>
            <option value="">Select a rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
          </select>
        </div>
        <div className="input-group">
          <label>Comment</label>
          <textarea rows="4" placeholder="Share your experience..." value={formData.comment} onChange={(e) => setFormData({...formData, comment: e.target.value})} required />
        </div>
        <button type="submit" className="primary-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;