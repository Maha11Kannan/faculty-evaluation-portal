import React, { useState } from 'react';
import api from './api'; // <--- IMPORTANT: Change axios to our 'api' bridge

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ studentName: '', facultyName: '', rating: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX: Changed 'http://localhost:5000/api/feedback' to just '/feedback'
      // The 'api' bridge handles the Render URL automatically
      await api.post('/feedback', formData);
      
      setSubmitted(true); // Trigger success animation
      
      // Auto-reset back to empty form after 3.5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ studentName: '', facultyName: '', rating: '', comment: '' });
      }, 3500);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Database connection error. Ensure your backend is running on Render.");
    }
  };

  // SUCCESS VIEW: Shows inside the white box
  if (submitted) {
    return (
      <div className="success-animation">
        <div className="check-icon">✓</div>
        <h2>Thank You!</h2>
        <p>Your feedback has been successfully synced with the university database.</p>
      </div>
    );
  }

  // FORM VIEW
  return (
    <div className="feedback-card">
      <h2>Send Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Student Name</label>
          <input 
            type="text" 
            placeholder="Your name" 
            value={formData.studentName} 
            onChange={(e) => setFormData({...formData, studentName: e.target.value})} 
            required 
          />
        </div>
        
        <div className="input-group">
          <label>Faculty Name</label>
          <input 
            type="text" 
            placeholder="Enter faculty name" 
            value={formData.facultyName} 
            onChange={(e) => setFormData({...formData, facultyName: e.target.value})} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Rating</label>
          <select 
            value={formData.rating} 
            onChange={(e) => setFormData({...formData, rating: e.target.value})} 
            required
          >
            <option value="">Select a rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
          </select>
        </div>

        <div className="input-group">
          <label>Comment</label>
          <textarea 
            rows="4" 
            placeholder="Share your experience..." 
            value={formData.comment} 
            onChange={(e) => setFormData({...formData, comment: e.target.value})} 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;