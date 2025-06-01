import React from 'react';
import './LoadingScreen.css'; // Make sure to create this CSS file

const LoadingScreen = () => {
  return (
    <div className="loader-container">
      <div className="loader-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
