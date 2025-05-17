import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPage = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Header />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-purple-400 text-center">Upcoming Features Blog</h1>

        {/* Blog Post 1 */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-purple-600 mb-2">📨 Smart Invite System</h2>
          <p className="text-gray-100">
            The Smart Invite System allows Admins to invite employees and external collaborators through email. 
            This feature ensures that only authorized users can register on the platform. It uses a secure invitation 
            link that expires after a set period, preventing unauthorized access. Once invited, users receive a 
            personalized registration flow and role-based onboarding.
          </p>
        </section>

        {/* Blog Post 2 */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-purple-600 mb-2">🗂️ AutoSync Workspace</h2>
          <p className="text-gray-100">
            AutoSync Workspace will simplify task file management. Whenever a task is created and assigned to an employee,
            the system will automatically generate a dedicated folder on the employee's dashboard. Employees can upload related 
            documents, progress files, or reports in this folder. Once the task is complete, they can submit it directly through 
            the workspace. This improves organization, eliminates manual file tracking, and enhances project transparency.
          </p>
        </section>

        {/* Blog Post 3 */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-purple-600 mb-2">🧠 AIML Task Advisor</h2>
          <p className="text-gray-100">
            AIML Task Advisor is an intelligent feature that leverages machine learning to analyze an employee’s past 
            task completion history. Based on task types, durations, and performance data, the model predicts the estimated 
            time required to complete new tasks. It also suggests the most suitable employee for a given task based on 
            historical efficiency and skill relevance—helping project managers make data-driven assignment decisions.
          </p>
        </section>
      </main>
       <Footer />
    </div>
  );
};

export default BlogPage;
