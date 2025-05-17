import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Header />
      <h1 className="text-4xl font-bold mb-6 text-purple-400 text-center">About Task Radar</h1>

      <section className="mb-8">
        <h2 className="text-2xl text-purple-800 font-semibold mb-2">Project Overview</h2>
        <p className="text-gray-100">
          <strong>Task Radar</strong> is a MERN stack-based task management platform designed for project-centric organizations. Inspired by Jira, it provides a granular, analytics-driven experience for team collaboration, task tracking, and time-based performance monitoring. Multiple team leads can manage different teams based on employee availability and project demands.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-purple-800 font-semibold mb-2">Key Features</h2>
        <ul className="list-disc list-inside text-gray-100 space-y-1">
          <li>Multiple team leads can manage individual teams independently.</li>
          <li>Each team lead can create teams, assign employees, and manage multiple projects.</li>
          <li>Granular task assignment per employee, with deadlines and priorities.</li>
          <li>Real-time task tracking with lifecycle states: <code>todo</code>, <code>in-progress</code>, <code>paused</code> (with reason), <code>ready-for-review</code>, and <code>completed</code>.</li>
          <li>Automatic time logging and detailed activity tracking.</li>
          <li>Email-based invitation system for new employees.</li>
          <li>Role-based dashboards: Employees view personal progress, while team leads see team-wide analytics.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-purple-800 font-semibold mb-2">System Architecture</h2>
        <p className="text-gray-100 mb-4">
          The system follows a layered and modular architecture using the MERN stack:
        </p>
        <ul className="list-disc list-inside text-gray-100 space-y-1">
          <li><strong>Presentation Layer:</strong> React.js frontend for user interfaces.</li>
          <li><strong>Business Logic Layer:</strong> Express.js API handling core logic, authentication, and analytics.</li>
          <li><strong>Data Layer:</strong> MongoDB with Mongoose schemas for data persistence.</li>
          <li><strong>External Service:</strong> Nodemailer for secure email-based invitations.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl text-purple-800 font-semibold mb-2">Analytics & Reporting</h2>
        <ul className="list-disc list-inside text-gray-100 space-y-1">
          <li><strong>Employee Dashboard:</strong> Shows task status, time spent, pause reasons, and personal trends.</li>
          <li><strong>Team Lead Dashboard:</strong> Displays team-wide analytics including task distribution, performance metrics, and project status.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl text-purple-800 font-semibold mb-2">Security & Best Practices</h2>
        <ul className="list-disc list-inside text-gray-100 space-y-1">
          <li>JWT-based authentication with role-based access (team lead vs. employee).</li>
          <li>Secure password hashing using bcrypt.</li>
          <li>Input validation and strict data authorization at every endpoint.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl text-purple-800 font-semibold mb-2">Conclusion</h2>
        <p className="text-gray-100">
          Task Radar offers a scalable, secure, and insightful task management solution tailored for collaborative teams and results-driven environments. Its modular design, robust data tracking, and real-time insights empower teams to deliver work efficiently while staying accountable.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
