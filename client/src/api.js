import React, { useState } from 'react';
import Login from './Login';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(""); 

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
        <>
          <button onClick={handleLogout} className="logout-glow-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
          {userRole === 'student' ? (
            <FeedbackForm />
          ) : (
            <FeedbackList facultyName={userName} />
          )}
        </>
      )}
    </div>
  );
}

export default App;