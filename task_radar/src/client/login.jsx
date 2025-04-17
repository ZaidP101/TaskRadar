import { useState } from 'react';
import './App.css';

function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Welcome, ${email}!`);
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
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default login;
