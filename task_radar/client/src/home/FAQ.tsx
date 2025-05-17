import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FaqPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Header />
      <h1 className="text-4xl font-bold mb-6 text-purple-400 text-center">Frequently Asked Questions</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">What is Task Radar?</h2>
        <p className="text-gray-100">
          Task Radar is a task management platform built using the MERN stack. It helps project-centric teams manage tasks, track time, and collaborate efficiently with real-time status updates and analytics dashboards.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">Who can use Task Radar?</h2>
        <p className="text-gray-100">
          Task Radar is designed for organizations with multiple teams and team leads. Both team leads and employees have role-based access to manage or work on tasks depending on their responsibilities.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">What are the roles in the system?</h2>
        <p className="text-gray-100">
          The platform supports two main roles:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Team Lead:</strong> Can create teams, assign projects, allocate tasks, and monitor performance.</li>
            <li><strong>Employee:</strong> Can view assigned tasks, log time, update task status, and track personal progress.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">What task statuses are supported?</h2>
        <p className="text-gray-100">
          Tasks can move through the following lifecycle states: <code>todo</code>, <code>in-progress</code>, <code>paused</code> (with a reason), <code>ready-for-review</code>, and <code>completed</code>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">Is time tracking automated?</h2>
        <p className="text-gray-100">
          Yes, Task Radar automatically logs time spent on each task based on status changes. For example, when a task moves to <code>in-progress</code>, the timer starts. It pauses during <code>paused</code> state and stops when the task is <code>completed</code> or marked <code>ready-for-review</code>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">How are new users added?</h2>
        <p className="text-gray-100">
          Team leads can invite new employees via email using a secure invitation system. Invited users receive a unique registration link.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">How is data secured?</h2>
        <p className="text-gray-100">
          Task Radar uses JWT-based authentication, role-based access control, bcrypt for password hashing, and strict input validation across the system to ensure secure data handling.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">What analytics are available?</h2>
        <p className="text-gray-100">
          The platform provides:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Employee dashboards:</strong> Show task status, time logs, and performance trends.</li>
            <li><strong>Team lead dashboards:</strong> Display team-level metrics such as task distribution, employee efficiency, and overall project status.</li>
          </ul>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-purple-800 mb-2">Can Task Radar be scaled?</h2>
        <p className="text-gray-100">
          Absolutely. The platform is modular and scalable, making it suitable for small teams as well as large organizations with multiple departments and complex workflows.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default FaqPage;
