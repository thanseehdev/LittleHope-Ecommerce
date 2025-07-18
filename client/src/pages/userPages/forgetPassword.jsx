import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FPEmailOtp,conFirmForgetPassword,verifyFPOTP } from '../../redux/features/user/userActions';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading, error, message, success } = useSelector((state) => state.user); // Update slice if needed

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
      alert(err);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(verifyFPOTP({ email, otp })).unwrap();
      setIsOtpVerified(true);
    } catch (err) {
      alert(err);
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
      alert(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-2 sm:items-center items-start pt-16 lg:py-1 bg-gradient-to-br from-white to-pink-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 relative">
        {/* Logo */}
        <img
          src="/LittleHope-Official-Logo2.png"
          alt="Logo"
          className="w-10 h-10 object-contain rounded-full bg-pink-100 absolute top-4 right-4"
        />

        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

        {/* Status Messages */}
        {loading && <p className="text-blue-500 text-center">Processing...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}

        {/* Step 1: Email */}
        {!otpSent && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {otpSent && !isOtpVerified && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP sent to {email}
              </label>
              <input
                type="text"
                id="otp"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500"
                placeholder="6-digit OTP"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {isOtpVerified && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500"
                placeholder="Re-enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}






