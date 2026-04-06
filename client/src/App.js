import React, { useState } from 'react';
import Login from './Login';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState(null); 
  const [userName, setUserName] = useState("");   

  const handleLogout = () => {
    setUserRole(null);
    setUserName("");
  };

  return (
    <div className="App">
      {/* Title only shows on Login Page */}
      {!userRole && (
        <header className="header-banner">
          <h1>Faculty Teaching Impact Evaluation Framework</h1>
        </header>
      )}

      <div className="content-container">
        {!userRole ? (
          /* Login uses its own class, but App.css handles the box */
          <Login onLoginSuccess={(role, name) => { setUserRole(role); setUserName(name); }} />
        ) : (
          <div className="dashboard-layout">
            {/* WELCOME TEXT POSITIONED DIRECTLY ABOVE THE PORTAL BOX */}
            <div className="welcome-header">
              Welcome, <strong>{userName}</strong>
            </div>

            {/* THIS IS THE ONLY WHITE BOX THAT SHOULD EXIST */}
            <div className="form-container">
              {userRole === 'student' ? (
                <FeedbackForm /> 
              ) : (
                <FeedbackList facultyName={userName} />
              )}
            </div>

            {/* LOGOUT BUTTON PINNED TO BOTTOM RIGHT */}
            <button onClick={handleLogout} className="nav-logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;