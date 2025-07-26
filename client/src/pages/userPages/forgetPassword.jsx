import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FPEmailOtp, conFirmForgetPassword, verifyFPOTP } from '../../redux/features/user/userActions';
import { clearMessages } from '../../redux/features/user/message';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user)
  const { message, error } = useSelector((state) => state.message);

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(FPEmailOtp({ email })).unwrap();
      setOtpSent(true);
    } catch (err) {
      console.log(err);

    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(verifyFPOTP({ email, otp })).unwrap();
      setIsOtpVerified(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await dispatch(conFirmForgetPassword({ email, password: newPassword })).unwrap();
      alert('Password reset successful. Please log in.');
      // Optionally, redirect to login or reset form state
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (message || error) {
      // Show the message or error
      const timer = setTimeout(() => {
        // Only dispatch clearMessages if the message/error is still present
        if (message || error) {
          dispatch(clearMessages());
        }
      }, 3000);
      return () => clearTimeout(timer); // Clear the timeout if the component is unmounted or before re-triggering
    }
  }, [message, error, dispatch]);

  return (
    <div className="min-h-screen flex  flex-col md:flex-row">
      {/* Promo Section */}
      <div
        className=" w-full md:w-1/2 relative overflow-hidden flex items-center justify-center p-8 md:p-12 bg-purple-900 text-white text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-opacity-75 md:bg-opacity-60 bg-purple-900"></div>

        <div className="relative z-10 max-w-md space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            RESET YOUR PASSWORD
          </h1>
          <p className="text-base md:text-lg drop-shadow-md">
            Enter your email, verify OTP, and set a new password to regain access.
          </p>
          <div className="bg-purple-700 bg-opacity-80 rounded-lg px-6 py-3 shadow-lg font-semibold tracking-wide text-lg md:text-xl inline-block">
            We're here to help
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className=" flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10 md:p-12 rounded-t-3xl md:rounded-r-3xl  relative">
        {/* Logo (top-right corner for large screens) */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Forgot Password
        </h2>

        {/* Status Messages */}
        {loading && <p className="text-blue-500 font-medium text-center mb-4">Processing...</p>}
        {(error || message) && (
          <div className="max-w-md mx-auto flex items-center bg-gray-50 border border-gray-300 rounded-md shadow-sm p-4 space-x-4 text-gray-800 font-medium text-sm relative">
            {/* Icon */}
            <div className={`flex-shrink-0 text-xl ${error ? 'text-red-500' : 'text-green-500'
              }`}>
              {error ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            {/* Message Text */}
            <p className="flex-grow">{error || message}</p>
          </div>
        )}



        {/* Step 1: Email */}
        {!otpSent && (
          <form onSubmit={handleEmailSubmit} className="w-full max-w-md space-y-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-purple-500 transition border-gray-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600  hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {otpSent && !isOtpVerified && (
          <form onSubmit={handleOtpSubmit} className="w-full max-w-md space-y-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                OTP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                maxLength={6}
                className="w-full border rounded-lg px-5 py-3 text-lg tracking-widest text-center focus:outline-none focus:border-purple-500 transition border-gray-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {isOtpVerified && (
          <form onSubmit={handlePasswordReset} className="w-full max-w-md space-y-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-purple-500 transition border-gray-300"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-purple-500 transition border-gray-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>

  );
}






