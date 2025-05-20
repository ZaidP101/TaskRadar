import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from './axios.js';
import React from 'react';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // optional: loading state

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      const { isAdmin, project } = response?.data?.data?.user || {};
      if (isAdmin === undefined) {
      throw new Error("User data is missing in response.");
      }
      alert(`Welcome, ${email}!`);
      
      // Route based on admin flag
      navigate(isAdmin ? '/adminDash' : `/empDash/${project}`);
    } catch (error) {
      console.error(error);
      alert('Login failed! ' + (error?.response?.data?.message || 'Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p style={{ marginTop: '10px' }}>
          Don’t have an account? <a href="/signup" style={{ color: '#0077ff', textDecoration: 'none' }}>Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
