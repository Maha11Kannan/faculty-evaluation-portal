import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackList = ({ facultyName }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/feedback');
        // Filter: Show only feedback addressed to THIS faculty member
        const filtered = res.data.filter(fb => 
          fb.facultyName.toLowerCase() === facultyName.toLowerCase()
        );
        setFeedbacks(filtered);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };
    fetchFeedback();
  }, [facultyName]);

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <h2 style={{color: 'white'}}>Feedback for {facultyName}</h2>
      {feedbacks.length === 0 ? (
        <div className="glass-card">No reviews yet.</div>
      ) : (
        feedbacks.map((fb, i) => (
          <div key={i} className="glass-card" style={{marginBottom: '15px', padding: '20px'}}>
            <h4>From: {fb.studentName}</h4>
            <p>Rating: {fb.rating}/5</p>
            <p style={{fontStyle: 'italic'}}>"{fb.comment}"</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;