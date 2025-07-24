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
   <div className="min-h-screen flex flex-col md:flex-row">
  {/* Promo Section */}
  <div
    className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center p-8 md:p-12 bg-green-900 text-white text-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-opacity-60 md:bg-opacity-60 bg-green-900"></div>

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

    {error && (
      <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center font-semibold text-sm max-w-md w-full flex items-center justify-center gap-2">

        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
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
          className={`w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-green-500 transition ${
            formErrors.name ? 'border-red-500' : 'border-gray-300'
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
          className={`w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-green-500 transition ${
            formErrors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Password <span className="text-red-500">*</span>
        </label>
        {formErrors.password && (
          <p className="text-red-600 text-xs mb-1 flex items-center gap-2">
            <span className="w-10 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">!</span> {formErrors.password}
          </p>
        )}
        <input
          type="password"
          value={form.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          placeholder="Enter your password"
          className={`w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-green-500 transition ${
            formErrors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
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
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          placeholder="Confirm password"
          className={`w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-green-500 transition ${
            formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>

      <p className="text-xs text-gray-500 mt-1 text-center">
        An OTP will be sent to your email address.
      </p>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition ${
          loading ? 'opacity-60 cursor-not-allowed' : ''
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

  {/* Loading overlay */}
  {loading && (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )}

  {/* Notification */}
  {showNotification && <Notification message={message} onClose={() => setShowNotification(false)} />}
</div>

  );
}






