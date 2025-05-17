import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login.jsx';
import Signup from './signin.jsx';
import AdminDash from './adminDash.jsx';
import UserDash from './userDash.jsx';
import axios from './axios.js';
import Home from './home/Home.js';
import AboutPage from './home/About.js';
import FaqPage from './home/FAQ.js';
import BlogPage from './home/Blog.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminDash" element={<AdminDash />} />
        <Route path="/userDash" element={<UserDash />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/FAQ" element={<FaqPage />} />
        <Route path="/Blog" element={<BlogPage />} />



      </Routes>
    </Router>
  );
}

export default App;
