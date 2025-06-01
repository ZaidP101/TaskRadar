import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login.jsx';
import Signup from './signin.jsx';
import AdminDash from './adminDash.jsx';
import EmployeeDashboard from './userDash.jsx';
import axios from './axios.js';
import Home from './home/Home.js';
import AboutPage from './home/About.js';
import FaqPage from './home/FAQ.js';
import BlogPage from './home/Blog.js';
import ProjectDashboard from './projectDash.jsx';
import CreateProject from './createProject.jsx';
import CreateTask from './createTask.jsx';
import ChangePassword from './changePass.jsx';
import UpdateAccount from './UpdateAccount.jsx';
import ProjectAnalysis from './analysis/main_analysis/ProjectAnalysis.jsx';
import TaskAnalysis from './analysis/p_analysis/TaskAnalysis.jsx';
import EmployeeAnalysis from './analysis/e_analysis/EmployeeAnalysis.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminDash" element={<AdminDash />} />
        <Route path="/empDash/:projectId" element={<EmployeeDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/FAQ" element={<FaqPage />} />
        <Route path="/Blog" element={<BlogPage />} />
        <Route path="/employee-dashboard/:employeeId" element={<EmployeeDashboard />} />
        <Route path="/project-dashboard/:projectId" element={<ProjectDashboard />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project-dashboard/:projectId/create-task" element={<CreateTask />} />
        <Route path="/update-account" element={<UpdateAccount />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/project-analysis" element={<ProjectAnalysis />} />
        <Route path="/task-analysis/:projectId" element={<TaskAnalysis />} />
        <Route path="/employee-analysis/:employeeId/:projectId" element={<EmployeeAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
