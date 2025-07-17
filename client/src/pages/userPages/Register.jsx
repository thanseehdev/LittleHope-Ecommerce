import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/features/user/userActions';
import { validateRegisterForm } from '../../utils/validation';
import Notification from '../../utils/notification.jsx';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({})
  const [message, setMessage] = useState(null)
  const [showNotification, setShowNotification] = useState(false)


  const { error, loading } = useSelector((state) => state.user);
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
      dispatch(registerUser(form)).then((resultAction) => {
        if (registerUser.fulfilled.match(resultAction)) {

          const { message } = resultAction.payload
          setMessage(message);
          setShowNotification(true); // Show notification

          setTimeout(() => {
            setShowNotification(false);
            navigate('/otp'); // Redirect to OTP page
          }, 3000);

        } else {
          
        }
      })
    } catch (err) {
      console.error('Registration error:', err);
    }

  }




  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-50 to-white items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-md  overflow-hidden p-6 sm:p-10">

        {/* Top right image inside form */}
        <div className="flex justify-end">
          <img
            src="/littleHope-logo3.png"
            alt="Logo"
            className="w-16 h-16 object-contain sm:w-20 sm:h-20"
          />
        </div>
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
          Register
        </h2>
{error && (
  <div className="flex items-center justify-center">
    <span className="ml-1 w-5 mb-3 h-5 bg-red-500 text-white text-center rounded-full flex items-center justify-center">
      !
    </span>
    <p className="text-red-500 ml-1 text-sm mb-3">{error}</p>
  </div>
)}


              
        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            {formErrors.name && (
              <div className="flex items-center">
                <span className=" w-5 h-5 bg-red-500 text-white text-center rounded-full flex items-center justify-center">
                  !
                </span>
                <p className="text-red-500 ml-1 text-sm mb-1">{formErrors.name}</p>
              </div>
            )}
            <input
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              type="text"
              placeholder="Enter your full name"
              className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 rounded-md   shadow-sm  focus:outline-none focus:border-green-500`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            {formErrors.email && (
              <div className="flex items-center">
                <span className="  w-5 h-5 bg-red-500 text-white text-center rounded-full flex items-center justify-center">
                  !
                </span>
                <p className="text-red-500 ml-1 text-sm mb-1">{formErrors.email}</p>
              </div>
            )}
            <input
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              type="email"
              placeholder="Enter your email"
              className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 rounded-md   shadow-sm  focus:outline-none focus:border-green-500`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            {formErrors.password && (
              <div className="flex items-center">
                <span className=" w-11 lg:w-9 h-5 bg-red-500 text-white text-center rounded-full flex items-center justify-center">
                  !
                </span>
                <p className="text-red-500 ml-1 text-sm mb-1">{formErrors.password}</p>
              </div>
            )}
            <input
              value={form.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              type="password"
              placeholder="Enter password"
              className={`w-full border ${formErrors.password ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 rounded-md   shadow-sm  focus:outline-none focus:border-green-500`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            {formErrors.confirmPassword && (
              <div className="flex items-center">
                <span className=" w-5 h-5 bg-red-500 text-white text-center rounded-full flex items-center justify-center">
                  !
                </span>
                <p className="text-red-500 ml-1 text-sm mb-1">{formErrors.confirmPassword}</p>
              </div>
            )}
            <input
              value={form.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              type="password"
              placeholder="Confirm password"
              className={`w-full border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 rounded-md  shadow-sm  focus:outline-none focus:border-green-500`}
            />
          </div>

          <p className="text-xs text-gray-500 mt-1">An OTP will be sent to your email address.</p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Get OTP'}
          </button>

        </form>

        <p className="text-xs text-gray-500 mt-5 text-center">
          By continuing, I agree to LittleHope's{' '}
          <a href="#" className="text-blue-600  hover:text-blue-800 transition">Terms of Use</a>{' '}
          and{' '}
          <a href="#" className="text-blue-600  hover:text-blue-800 transition ">Privacy Policy</a>.
        </p>
        <p className="text-sm text-center text-gray-600 mt-4">
  Already have an account?{' '}
  <Link
    to="/login"
    className="text-blue-600 font-medium hover:underline underline"
  >
    Log in here
  </Link>
</p>
      </div>
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Show Notification only if it's true */}
      {showNotification && <Notification message={message} onClose={() => setShowNotification(false)} />}
    </div>
  );
}






