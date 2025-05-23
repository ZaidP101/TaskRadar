import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
        <h1 className="text-4xl font-bold text-purple-400 text-center drop-shadow-lg">About Task Radar</h1>

        {/* Project Overview */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] border border-purple-800 transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl text-purple-400 font-semibold mb-3">Project Overview</h2>
          <p className="text-gray-200">
            <strong>Task Radar</strong> is a MERN stack-based task management platform designed for project-centric organizations...
          </p>
        </div>

        {/* Key Features */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] border border-purple-800 transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl text-purple-400 font-semibold mb-3">Key Features</h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2 pl-4">
            <li>Multiple team leads can manage individual teams independently.</li>
            <li>Team leads create teams, assign employees, and manage projects.</li>
            <li>Granular task assignment with deadlines and priorities.</li>
            <li>Task lifecycle states: <code>todo</code>, <code>in-progress</code>, <code>paused</code>, <code>ready-for-review</code>, <code>completed</code>.</li>
            <li>Automatic time logging and activity tracking.</li>
            <li>Email-based employee invitations.</li>
            <li>Role-based dashboards for personal and team analytics.</li>
          </ul>
        </div>

        {/* System Architecture */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] border border-purple-800 transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl text-purple-400 font-semibold mb-3">System Architecture</h2>
          <p className="text-gray-200 mb-4">
            The system uses a modular MERN stack:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 pl-4">
            <li><strong>Frontend:</strong> React.js</li>
            <li><strong>Backend:</strong> Express.js</li>
            <li><strong>Database:</strong> MongoDB with Mongoose</li>
            <li><strong>Service:</strong> Nodemailer for invitations</li>
          </ul>
        </div>

        {/* Analytics & Reporting */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] border border-purple-800 transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl text-purple-400 font-semibold mb-3">Analytics & Reporting</h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2 pl-4">
            <li><strong>Employee Dashboard:</strong> Task status, time, trends</li>
            <li><strong>Team Lead Dashboard:</strong> Analytics on tasks, performance</li>
          </ul>
        </div>

        {/* Security */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] border border-purple-800 transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl text-purple-400 font-semibold mb-3">Security & Best Practices</h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2 pl-4">
            <li>JWT-based role authentication</li>
            <li>Password hashing with bcrypt</li>
            <li>Strict validation and authorization</li>
          </ul>
        </div>

        {/* Conclusion */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] border border-purple-800 transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl text-purple-400 font-semibold mb-3">Conclusion</h2>
          <p className="text-gray-200">
            Task Radar is a secure, scalable, and analytics-rich platform built for collaborative and result-driven teams.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
