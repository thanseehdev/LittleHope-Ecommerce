import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/features/user/userActions';
import { validateRegisterForm } from '../../utils/validation';
import { clearMessages } from '../../redux/features/user/message.js';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formErrors, setFormErrors] = useState({})
  const { loading } = useSelector((state) => state.user);
  const { message, error } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });

    // Clear errors for the specific field
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[field];  // Clear specific error for the changed field
      return updatedErrors;
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateRegisterForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    try {
      dispatch(registerUser(form))
    } catch (err) {
      console.log('Registration error:', err);
    }

  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
        navigate('/otp');
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());

      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch, navigate]);


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Promo Section */}
      <div
        className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center p-8 md:p-12 bg-green-900 text-white text-center"
        style={{
          backgroundImage:
            "url('/register.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  bg-green-900/60"></div>

        <div className="relative z-10 max-w-md space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            JOIN & SAVE ₹100*
          </h1>
          <p className="text-base md:text-lg drop-shadow-md">
            Create your account to enjoy exclusive offers plus free shipping on your first order.
          </p>
          <div className="bg-green-700 bg-opacity-80 rounded-lg px-6 py-3 shadow-lg font-semibold tracking-wide text-lg md:text-xl inline-block">
            COUPON: <span className="uppercase">HOPE100</span>
          </div>
        </div>
      </div>

      {/* Register Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10 md:p-12 rounded-t-3xl md:rounded-r-3xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Register
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
              Full Name <span className="text-red-500">*</span>
            </label>
            {formErrors.name && (
              <p className="text-red-600 text-xs mb-1 flex items-center gap-2">
                <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">!</span> {formErrors.name}
              </p>
            )}
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className={`w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-green-500 transition ${formErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            {formErrors.email && (
              <p className="text-red-600 text-xs mb-1 flex items-center gap-2">
                <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">!</span> {formErrors.email}
              </p>
            )}
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              className={`w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-green-500 transition ${formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            {formErrors.password && (
              <p className="text-red-600 text-xs mb-1 flex items-center gap-2">
                <span className="w-5 mr-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">!</span> {formErrors.password}
              </p>
            )}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                className={`w-full border rounded-lg px-5 py-3 pr-12 focus:outline-none focus:border-green-500 transition ${formErrors.password ? 'border-red-500' : 'border-gray-300'}`}
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
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            {formErrors.confirmPassword && (
              <p className="text-red-600 text-xs mb-1 flex items-center gap-2">
                <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">!</span> {formErrors.confirmPassword}
              </p>
            )}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm password"
                className={`w-full border rounded-lg px-5 py-3 pr-12 focus:outline-none focus:border-green-500 transition ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-xl text-gray-600 hover:text-indigo-600"
                tabIndex={-1}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>


          <p className="text-xs text-gray-500 mt-1 text-center">
            An OTP will be sent to your email address.
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition ${loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Processing...' : 'Get OTP'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-8 max-w-md">
          By continuing, you agree to LittleHope's{' '}
          <a href="#" className="text-green-600 hover:underline">
            Terms of Use
          </a>{' '}
          and{' '}
          <a href="#" className="text-green-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        <p className="text-sm text-center text-gray-600 mt-4 max-w-md">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 font-semibold hover:underline">
            Log in here
          </Link>
        </p>
      </div>



    </div>

  );
}






