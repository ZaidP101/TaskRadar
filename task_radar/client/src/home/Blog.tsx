import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <Header />
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-purple-400 text-center mb-10 drop-shadow-md">Upcoming Features </h1>

        {/* Blog Post 1 */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">📨 Smart Invite System</h2>
          <p>
            The Smart Invite System allows Admins to invite employees and external collaborators through email. 
            This feature ensures that only authorized users can register on the platform. It uses a secure invitation 
            link that expires after a set period, preventing unauthorized access. Once invited, users receive a 
            personalized registration flow and role-based onboarding.
          </p>
        </div>

        {/* Blog Post 2 */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">🗂️ AutoSync Workspace</h2>
          <p>
            AutoSync Workspace will simplify task file management. Whenever a task is created and assigned to an employee,
            the system will automatically generate a dedicated folder on the employee's dashboard. Employees can upload related 
            documents, progress files, or reports in this folder. Once the task is complete, they can submit it directly through 
            the workspace. This improves organization, eliminates manual file tracking, and enhances project transparency.
          </p>
        </div>

        {/* Blog Post 3 */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-[0_4px_20px_rgba(128,90,213,0.3)] transform hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl font-semibold text-purple-400 mb-2">🧠 AIML Task Advisor</h2>
          <p>
            AIML Task Advisor is an intelligent feature that leverages machine learning to analyze an employee’s past 
            task completion history. Based on task types, durations, and performance data, the model predicts the estimated 
            time required to complete new tasks. It also suggests the most suitable employee for a given task based on 
            historical efficiency and skill relevance—helping project managers make data-driven assignment decisions.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
