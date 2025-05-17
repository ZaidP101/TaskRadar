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
            <Button variant="ghost" size="sm" className="">
                Home
            </Button>
        </Link>
        <Link to="/About">
            <Button variant="ghost" size="sm" className="">
                About
            </Button>
        </Link>
        <Link to="/Blog">
          <Button variant="ghost" size="sm" className="">
            Blog
          </Button>
        </Link>
        <Link to="/FAQ">
          <Button variant="ghost" size="sm" className="">
            FAQ
          </Button>
        </Link>
        <Link to="/login">
            <Button variant="ghost" size="sm" className="">
                Log in
            </Button>
        </Link>
      </div>

      
      <div className="text-center max-w-3xl mt-10">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
          From Workforce to Worthforce  <span className="italic text-purple-400">with TaskRadar.</span>
        </h1>
        <p className="text-gray-400 mb-8 text-lg">
          TaskRadar is more than a project dashboard — it's your intelligent work engine.
            Designed for single-lead teams, it not only helps you assign tasks and manage projects, but also brings real-time visibility into work patterns, focus time, and productivity.

        </p>

        <div className="flex justify-center mb-4">
          <Button variant="default" size="lg" className="px-6 py-3 text-md">
            Get Started <FaArrowRight className="ml-2" />
          </Button>
        </div>

        <div className="space-x-4">
          <Link to="/login">
            <Button variant="secondary" size="lg" className="">
                Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="secondary" size="lg" className="">
                Sign Up
            </Button>
          </Link>
        </div>
      </div>

     {/*footer*/}
      <div className="absolute bottom-5 text-sm text-gray-400 opacity-70">
        Built with MERN • Analytics Ready • Built for Builders Powered by Productivity 
      </div>
    </div>
  );
}

export default Home;
