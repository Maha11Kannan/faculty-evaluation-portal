import React, { useEffect, useState } from 'react';
import api from './api'; // Ensure this matches your api.js filename

const FeedbackList = ({ facultyName }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // We define the function INSIDE the effect to stop the Vercel Build Error
    const fetchFeedback = async () => {
      if (!facultyName) return;
      setLoading(true);
      try {
        const res = await api.get(`/feedback/${facultyName}`);
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [facultyName]); // Now Vercel is happy!

  // --- Calculations for the Dashboard Stats ---
  const totalReviews = feedbacks.length;
  const avgRating = totalReviews > 0 
    ? (feedbacks.reduce((acc, curr) => acc + Number(curr.rating), 0) / totalReviews).toFixed(1) 
    : "0.0";

  return (
    <div className="faculty-dashboard">
      {/* --- DASHBOARD HEADER --- */}
      <div className="dashboard-static-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{ textAlign: 'left', margin: '0 0 15px 0' }}>
            Faculty Impact Framework: {facultyName}
          </h3>
          <div className="status-indicator">
            {loading ? "Updating..." : "Connected"}
          </div>
        </div>

        <div className="stats-summary" style={{ marginBottom: '15px', textAlign: 'left' }}>
           <p>Average Impact Score: <strong>{avgRating} / 5.0</strong></p>
           <p>Total Student Responses: <strong>{totalReviews}</strong></p>
           <p style={{ fontSize: '0.85rem', color: '#718096' }}>
             Data synced with University MongoDB Cloud.
           </p>
        </div>
        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '10px 0' }} />
      </div>

      {/* --- SCROLLABLE FEEDBACK CARDS --- */}
      <div className="feedback-list-container" style={{ maxHeight: '450px', overflowY: 'auto' }}>
        {feedbacks.length === 0 ? (
          <p style={{ padding: '20px', color: '#718096', textAlign: 'center' }}>
            No student feedback records found for this faculty.
          </p>
        ) : (
          feedbacks.map((fb, i) => (
            <div key={i} className="student-feedback-card" style={{ 
              background: '#fff', 
              padding: '15px', 
              borderRadius: '12px', 
              marginBottom: '15px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: '1px solid #edf2f7'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, color: '#2d3748' }}>{fb.studentName || "Anonymous Student"}</h4>
                <div className="rating-badge" style={{
                  background: '#585bc1',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}>
                  {fb.rating} ★
                </div>
              </div>
              
              <p className="feedback-comment" style={{ fontStyle: 'italic', margin: '12px 0', color: '#4a5568', lineHeight: '1.5' }}>
                "{fb.comment}"
              </p>
              
              <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#a0aec0', textAlign: 'right' }}>
                Verified: {fb.createdAt ? new Date(fb.createdAt).toLocaleDateString() : 'Recent'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackList;