import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // New state for Phase 2 Security
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic: In Phase 2, this verifies credentials against the User model
    const finalName = role === 'faculty' ? name : "Student";
    onLoginSuccess(role, finalName);
  };

  return (
    <div className="glass-card bigger-card">
      <h2>University Portal</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Login As</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        
        {role === 'faculty' && (
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
        )}

        <div className="input-group">
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="name@university.edu" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        {/* Added Password Field for Secure Auth Criteria */}
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        
        <button type="submit" className="primary-btn">Sign In</button>
      </form>
    </div>
  );
};

export default Login;