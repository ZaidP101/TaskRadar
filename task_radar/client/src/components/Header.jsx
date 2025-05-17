import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-400">
          <Link to="/">Task Radar</Link>
        </h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-purple-400">Home</Link>
          <Link to="/about" className="hover:text-purple-400">About</Link>
          <Link to="/faq" className="hover:text-purple-400">FAQ</Link>
          <Link to="/blog" className="hover:text-purple-400">Blog</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
