import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login.jsx';
import Signup from './signin.jsx';
import AdminDash from './adminDash.jsx';
import UserDash from './userDash.jsx';
import axios from './axios.js';
import Test from './test.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminDash" element={<AdminDash />} />
        <Route path="/userDash" element={<UserDash />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
