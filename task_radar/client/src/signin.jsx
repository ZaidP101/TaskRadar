import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import axios from './axios.js';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: null,
    isAdmin: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('avatar', formData.avatar);
    data.append('isAdmin', formData.isAdmin);

    try {
      await axios.post('http://localhost:3000/api/user/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Registration successful!');
      navigate(formData.isAdmin ? '/adminDash' : '/empDash');
    } catch (error) {
      console.error(error);
      alert('Registration failed!');
    }
  };

  return (
    <div className="login-wrapper" style={{backgroundColor: "#070000"}}>
      <div className="login-container">
        <h2 className="login-title">Signup</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
          />
          <label htmlFor="avatar" className="custom-file-upload">
            Upload Avatar
          </label>
          <input
            id="avatar"
            type="file"
            name="avatar"
            onChange={handleChange}
            className="file-input-hidden"
          />
          
          <div className="form-group" style={{  color: '#ffffff' }}>
            <label>
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
              />
              {' '}Register as Admin
            </label>
          </div>
          <button type="submit" className="login-button" style={{ width: '100%', marginTop: '15px' }}>
            Signup
          </button>
        </form>
        <p style={{ marginTop: '10px', textAlign: 'center', color: '#ffffff' }}>
          Already have an account? <a href="/login" style={{ color: '#0077ff', textDecoration: 'none' }}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
