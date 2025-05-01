import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from './axios.js';
import React from 'react';



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
        isAdmin,
      },{
        withCredentials: true,
      });

      alert(`Welcome, ${email}!`);
      navigate(isAdmin ? '/adminDash' : '/userDash');
    } catch (error) {
      console.error(error);
      alert('Login failed!');
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
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={() => setIsAdmin(!isAdmin)}
          /> Login as Admin
        </label>
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <p style={{ marginTop: '10px' }}>
          Don’t have an account? <a href="/signup">      Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
