import React from "react";
import { Button } from "../components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";



function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10">
      {/* Logo and Navigation */}
      <div className="absolute top-5 left-6 text-xl font-bold">TaskRadar</div>
      <div className="absolute top-5 right-6 space-x-4">
        <Link to="/">
          <Button className="" variant="ghost" size="sm">Home</Button>
        </Link>
        <Link to="/About">
          <Button className="" variant="ghost" size="sm">About</Button>
        </Link>
        <Link to="/Blog">
          <Button className="" variant="ghost" size="sm">Blog</Button>
        </Link>
        <Link to="/FAQ">
          <Button className="" variant="ghost" size="sm">FAQ</Button>
        </Link>
        <Link to="/login">
          <Button className="" variant="ghost" size="sm">Log in</Button>
        </Link>
      </div>

     <div className="text-center max-w-4xl mt-16">
        <h1 className="text-9xl font-extrabold leading-tight mb-10 font-serif">
          From Workforce to Worthforce <span className="italic text-purple-500 font-serif">with TaskRadar.</span>
        </h1>

        <p className="text-gray-400 mb-10 text-lg">
          TaskRadar is more than a project dashboard — it's your intelligent work engine.
          Designed for single-lead teams, it not only helps you assign tasks and manage projects,
          but also brings real-time visibility into work patterns, focus time, and productivity.
        </p>

        {/* Non-clickable Get Started Button */}
         <div className="flex justify-center mb-4 border border-purple-600 mt-10 p-4 rounded-lg">
          <Button variant="default" size="lg" className="px-6 py-3 text-md">
            Get Started <FaArrowRight className="ml-2" />
          </Button>
        </div>

        <div className="space-x-4">
          <Link to="/login">
            <Button className="bg-purple-700 text-black hover:bg-purple-500" variant="secondary" size="lg">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-purple-700 text-black hover:bg-purple-500" variant="purple" size="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 text-sm text-gray-400 opacity-70">
        Built with MERN • Analytics Ready • Built for Builders Powered by Productivity
      </div>
    </div>
  );
}

export default Home;
