// src/pages/ComingSoon.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/userCom/common/Navbar';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className=' h-1'></div>
    <div className="relative w-full h-screen overflow-hidden">
      {/* Blurred background image */}
      <img
        src="/comingSoonMobile.png"
        alt="Coming Soon Background"
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm brightness-75"
      />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 bg-white/20 text-white px-3 py-1 rounded hover:bg-white/30 backdrop-blur-md transition"
      >
        ← Back
      </button>

      {/* Centered overlay text */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <p className="text-lg md:text-xl text-white text-center px-6">
          We're working on something awesome. Stay tuned!
        </p>
      </div>
    </div>
    </>
  );
};

export default ComingSoon;

