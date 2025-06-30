import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-lg  overflow-hidden p-6 sm:p-10">
        
        {/* Top right image inside form */}
        <div className="flex justify-end">
          <img
            src="/LittleHope-Logo-Img.png"
            alt="Logo"
            className="w-16 h-16 object-contain sm:w-20 sm:h-20"
          />
        </div>
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
          Register
        </h2>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:border-green-500"
            />
          </div>

          <p className="text-xs text-gray-500 mt-1">An OTP will be sent to your email address.</p>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Get OTP
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-5 text-center">
          By continuing, I agree to LittleHope's{' '}
          <a href="#" className="text-blue-600 underline hover:text-blue-800 transition">Terms of Use</a>{' '}
          and{' '}
          <a href="#" className="text-blue-600 underline hover:text-blue-800 transition">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}






