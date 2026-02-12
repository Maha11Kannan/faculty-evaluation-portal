import React, { useState } from 'react';
import Login from './Login';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState(null); // Tracks 'student' or 'faculty'
  const [userName, setUserName] = useState("");   // Tracks faculty identity

  const handleLoginSuccess = (role, name) => {
    setUserRole(role);
    setUserName(name); 
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName("");
  };

  return (
    <div className="App">
      {!userRole ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="main-content">
          <button onClick={handleLogout} className="logout-glow-btn">
             Logout
          </button>

          {userRole === 'student' ? (
            <FeedbackForm />
          ) : (
            <FeedbackList facultyName={userName} /> 
          )}
        </div>
      )}
    </div>
  );
}

export default App;