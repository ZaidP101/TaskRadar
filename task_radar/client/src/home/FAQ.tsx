import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FaqPage = () => {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <Header />
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-purple-400 text-center mb-10 drop-shadow-md">Frequently Asked Questions</h1>

        {/* FAQ sections */}
        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">What is Task Radar?</h2>
            <p>
              Task Radar is a task management platform built using the MERN stack. It helps project-centric teams manage tasks, track time, and collaborate efficiently with real-time status updates and analytics dashboards.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">Who can use Task Radar?</h2>
            <p>
              Task Radar is designed for organizations with multiple teams and team leads. Both team leads and employees have role-based access to manage or work on tasks depending on their responsibilities.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">What are the roles in the system?</h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Team Lead:</strong> Can create teams, assign projects, allocate tasks, and monitor performance.</li>
              <li><strong>Employee:</strong> Can view assigned tasks, log time, update task status, and track personal progress.</li>
            </ul>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">What task statuses are supported?</h2>
            <p>
              Tasks can move through the following lifecycle states: <code className="text-yellow-300">todo</code>, <code className="text-yellow-300">in-progress</code>, <code className="text-yellow-300">paused</code>, <code className="text-yellow-300">ready-for-review</code>, and <code className="text-yellow-300">completed</code>.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">Is time tracking automated?</h2>
            <p>
              Yes, Task Radar automatically logs time spent on each task based on status changes. For example, when a task moves to <code className="text-yellow-300">in-progress</code>, the timer starts. It pauses during <code className="text-yellow-300">paused</code> state and stops when the task is <code className="text-yellow-300">completed</code> or marked <code className="text-yellow-300">ready-for-review</code>.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">How are new users added?</h2>
            <p>
              Team leads can invite new employees via email using a secure invitation system. Invited users receive a unique registration link.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">How is data secured?</h2>
            <p>
              Task Radar uses JWT-based authentication, role-based access control, bcrypt for password hashing, and strict input validation across the system to ensure secure data handling.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">What analytics are available?</h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Employee dashboards:</strong> Show task status, time logs, and performance trends.</li>
              <li><strong>Team lead dashboards:</strong> Display team-level metrics such as task distribution, employee efficiency, and overall project status.</li>
            </ul>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">Can Task Radar be scaled?</h2>
            <p>
              Absolutely. The platform is modular and scalable, making it suitable for small teams as well as large organizations with multiple departments and complex workflows.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqPage;
