import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  FPEmailOtp,
  conFirmForgetPassword,
  verifyFPOTP,
} from '../../redux/features/user/userActions';
import { clearMessages } from '../../redux/features/user/message';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);
  const { message, error } = useSelector((state) => state.message);

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (field, value) => {
  setForm((prev) => ({ ...prev, [field]: value }));

  // Clear the error message for the field being edited
  setFormErrors((prevErrors) => ({
    ...prevErrors,
    [field]: '',
  }));
};


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

  const validatePasswords = () => {
    const errors = {};
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (!passwordRegex.test(form.password)) {
      errors.password =
        'Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character.';
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    try {
      await dispatch(
        conFirmForgetPassword({ email, password: form.password })
      ).unwrap();
      setTimeout(() => navigate('/login'), 1000);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        if (message || error) {
          dispatch(clearMessages());
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Promo Section */}
      <div
        className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center p-8 md:p-12 bg-purple-900 text-white text-center"
        style={{
          backgroundImage: "url('/forgetPass.webp')",
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
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10 md:p-12 rounded-t-3xl md:rounded-r-3xl relative">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Forgot Password
        </h2>

        {(error || message) && (
          <div className="max-w-md mx-auto flex items-center bg-gray-50 border border-gray-300 rounded-md shadow-sm p-4 space-x-4 text-gray-800 font-medium text-sm relative">
            <div
              className={`flex-shrink-0 text-xl ${
                error ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {error ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <p className="flex-grow">{error || message}</p>
          </div>
        )}

        {/* Step 1: Email */}
        {!otpSent && (
          <form
            onSubmit={handleEmailSubmit}
            className="w-full max-w-md space-y-6"
          >
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
              disabled={loading}
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing...' : 'Send OTP'}
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {otpSent && !isOtpVerified && (
          <form
            onSubmit={handleOtpSubmit}
            className="w-full max-w-md space-y-6"
          >
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
              disabled={loading}
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing...' : 'Verify OTP'}
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {isOtpVerified && (
          <form
            onSubmit={handlePasswordReset}
            className="w-full max-w-md space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) =>
                    handleInputChange('password', e.target.value)
                  }
                  placeholder="Enter your password"
                  className={`w-full border rounded-lg px-5 py-3 pr-12 focus:outline-none transition ${
                    formErrors.password
                      ? 'border-red-500'
                      : 'focus:border-green-500 border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-xl text-gray-600 hover:text-indigo-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleInputChange('confirmPassword', e.target.value)
                  }
                  placeholder="Confirm password"
                  className={`w-full border rounded-lg px-5 py-3 pr-12 focus:outline-none transition ${
                    formErrors.confirmPassword
                      ? 'border-red-500'
                      : 'focus:border-green-500 border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-xl text-gray-600 hover:text-indigo-600"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}






