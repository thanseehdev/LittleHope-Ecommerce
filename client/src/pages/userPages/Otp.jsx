import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../../redux/features/user/userActions';
import { useNavigate } from 'react-router-dom';

export default function EnterOtp() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const email = useSelector((state) => state.user.emailForOTP);
  const navigate = useNavigate();

  const submitOTP = (e) => {
    e.preventDefault();
    dispatch(verifyOTP({ email, otp })).then((resultAction) => {
      if (verifyOTP.fulfilled.match(resultAction)) {
        navigate('/login');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Enter OTP</h2>
          <p className="text-sm text-gray-500 mt-1">
            We've sent a 6-digit verification code to your {email}
          </p>
        </div>

        <form className="space-y-5" onSubmit={submitOTP}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP Code <span className="text-red-500">*</span>
            </label>
            <input
              value={otp}
              type="text"
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="Enter OTP"
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-lg tracking-widest text-center focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
          >
            Verify OTP
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't get the code?{' '}
            <button className="text-blue-600 hover:underline hover:text-blue-800 transition">
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

