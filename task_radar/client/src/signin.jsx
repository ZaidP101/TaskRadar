import { useState } from 'react';
import './App.css'; // Reuse same CSS

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    alert(`Welcome, ${name}!`);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="login-input"
        />

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

        <button onClick={handleSignup} className="login-button">
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Signup;
