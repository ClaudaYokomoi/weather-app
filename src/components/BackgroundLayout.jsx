import React from 'react';
import backgroundImage from '../assets/images/background.jpg'; // Adjust the path based on your file structure

const BackgroundLayout = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundLayout;
