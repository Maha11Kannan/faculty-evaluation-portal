import React, { useEffect, useState } from 'react';
import api from './api'; // IMPORTANT: This connects to your Render backend

const FeedbackList = ({ facultyName }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from the database
  const fetchFeedback = async () => {
    if (!facultyName) return;
    setLoading(true);
    try {
      // This calls your Render URL: e.g., https://your-backend.onrender.com/api/feedback/Maha
      const res = await api.get(`/feedback/${facultyName}`); 
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Run this whenever the facultyName changes (like after login)
  useEffect(() => {
    fetchFeedback();
  }, [facultyName]);

  // Calculations for your dashboard stats
  const totalReviews = feedbacks.length;
  const avgRating = totalReviews > 0 
    ? (feedbacks.reduce((acc, curr) => acc + Number(curr.rating), 0) / totalReviews).toFixed(1) 
    : 0;

  return (
    <div className="faculty-dashboard">
      {/* --- DASHBOARD HEADER --- */}
      <div className="dashboard-static-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ textAlign: 'left', margin: '0 0 15px 0' }}>
            Faculty Impact Framework: {facultyName}
          </h3>
          <button 
            onClick={fetchFeedback} 
            className="refresh-btn"
            style={{
              padding: '8px 15px',
              borderRadius: '8px',
              background: '#585bc1',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '700'
            }}
          >
            {loading ? "Updating..." : "Refresh Feed"}
          </button>
        </div>

        <div className="stats-summary" style={{ marginBottom: '15px', textAlign: 'left' }}>
           <p>Average Impact Score: <strong>{avgRating} / 5.0</strong></p>
           <p>Total Student Responses: <strong>{totalReviews}</strong></p>
           <p style={{ fontSize: '0.85rem', color: '#718096' }}>
             Feedback is verified and synced with the university database.
           </p>
        </div>
        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '10px 0' }} />
      </div>

      {/* --- SCROLLABLE FEEDBACK CARDS --- */}
      <div className="feedback-list-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {feedbacks.length === 0 ? (
          <p style={{ padding: '20px', color: '#718096' }}>No student feedback records found yet.</p>
        ) : (
          feedbacks.map((fb, i) => (
            <div key={i} className="student-feedback-card" style={{ 
              background: '#fff', 
              padding: '15px', 
              borderRadius: '12px', 
              marginBottom: '15px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              border: '1px solid #edf2f7'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, color: '#2d3748' }}>{fb.studentName || "Anonymous Student"}</h4>
                <div className="rating-badge" style={{
                  background: '#f6ad55',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {fb.rating} ★
                </div>
              </div>
              
              <p className="feedback-comment" style={{ fontStyle: 'italic', margin: '10px 0', color: '#4a5568' }}>
                "{fb.comment}"
              </p>
              
              <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#a0aec0', textAlign: 'right' }}>
                {fb.createdAt ? new Date(fb.createdAt).toLocaleDateString() : 'Recent'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackList;