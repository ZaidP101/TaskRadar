import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black-200 text-gray-400 text-center ">
      <p>&copy; {new Date().getFullYear()} Task Radar. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
