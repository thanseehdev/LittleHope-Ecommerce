import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/user/userActions";
import { validateLoginForm } from "../../utils/validateLoginForm";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { clearMessages } from "../../redux/features/user/message";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { message, error } = useSelector((state) => state.message);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (message) {
        // If there is a success message, do not redirect immediately
        const timer = setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }, 2000); // Delay for 3 seconds to show the message
        return () => clearTimeout(timer); // Clean up the timeout
      } else {
        // Redirect without delay if no message
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }
    }
  }, [isAuthenticated, user, message, navigate]);


  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });

    // Clear errors for the specific field
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[field]; // Clear specific error for the changed field
      return updatedErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateLoginForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    // Dispatch login action after form validation
    dispatch(login(form));
  };

  useEffect(() => {
    if (message || error) {
      // Show the message or error
      const timer = setTimeout(() => {
        // Only dispatch clearMessages if the message/error is still present
        if (message || error) {
          dispatch(clearMessages());
        }
      }, 2000);
      return () => clearTimeout(timer); // Clear the timeout if the component is unmounted or before re-triggering
    }
  }, [message, error, dispatch]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Promo Section (Mobile first: on top) */}
      <div
        className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center p-8 md:p-12 bg-indigo-900 text-white text-center"
        style={{
          backgroundImage: "url('/login.webp')", // ✅ add leading slash
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}

      >
        {/* Overlay */}
         <div className="absolute inset-0 bg-indigo-900/60"></div>

        <div className="relative z-10 max-w-md space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            FLAT ₹100 OFF*
          </h1>
          <p className="text-base md:text-lg drop-shadow-md">
            Join us and enjoy exclusive discounts plus free shipping on your first order.
          </p>
          <div className="bg-indigo-700/80 bg-opacity-80 rounded-lg px-6 py-3 shadow-lg font-semibold tracking-wide text-lg md:text-xl inline-block">
            COUPON: <span className="uppercase">HOPE100</span>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10 md:p-12 rounded-t-3xl md:rounded-r-3xl ">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Welcome Back!
        </h2>

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


        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 lg:text-base text-sm">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email Id <span className="text-red-500">*</span>
            </label>
            {formErrors.email && (
              <p className="text-red-600 text-xs mb-1 flex items-center gap-2">
                <span className="bg-red-500 rounded-full px-2 text-white font-bold">!</span> {formErrors.email}
              </p>
            )}
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              placeholder="Enter your email address"
              className={`w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-indigo-500 transition ${formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
            />
          </div>

          <div className="relative">
  <input
    type={showPassword ? 'text' : 'password'}
    value={form.password}
    onChange={(e) => handleInputChange('password', e.target.value)}
    required
    placeholder="Enter your password"
    className={`w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-indigo-500 transition ${formErrors.password ? 'border-red-500' : 'border-gray-300'
      }`}
  />

  <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute inset-y-0 right-3 flex items-center text-xl text-gray-600 hover:text-indigo-600"
  tabIndex={-1}
>
  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
</button>
</div>
<div className="text-right mt-1">
              <Link to="/forgotPassword" className="text-indigo-600 hover:underline lg:text-sm text-xs font-semibold">
                Forgot Password?
              </Link>
            </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition ${loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Processing...' : 'CONTINUE'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8 text-sm max-w-md">
          New to LittleHope?{' '}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>

        <p className="text-xs text-gray-400 text-center mt-4 max-w-md">
          By continuing, you agree to LittleHope's{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
