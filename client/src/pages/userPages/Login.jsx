import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/user/userActions";
import { validateLoginForm } from "../../utils/validateLoginForm";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, user } = useSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    }
  }, [isAuthenticated, user, navigate]);


  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({})
  const dispatch = useDispatch()

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });

    // Clear errors for the specific field
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[field];  // Clear specific error for the changed field
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

    try {
      dispatch(login(form))
    } catch (error) {

    }
  };

  return (
  <div className="min-h-screen flex flex-col md:flex-row">
  {/* Promo Section (Mobile first: on top) */}
  <div
    className="w-full md:w-1/2 relative   overflow-hidden flex items-center justify-center p-8 md:p-12 bg-indigo-900 text-white text-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-opacity-60 md:bg-opacity-60 bg-indigo-900"></div>

    <div className="relative z-10 max-w-md space-y-6">
      <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
        FLAT ₹100 OFF*
      </h1>
      <p className="text-base md:text-lg drop-shadow-md">
        Join us and enjoy exclusive discounts plus free shipping on your first order.
      </p>
      <div className="bg-indigo-700 bg-opacity-80 rounded-lg px-6 py-3 shadow-lg font-semibold tracking-wide text-lg md:text-xl inline-block">
        COUPON: <span className="uppercase">HOPE100</span>
      </div>
    </div>
  </div>

  {/* Login Form Section */}
  <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10 md:p-12 rounded-t-3xl md:rounded-r-3xl shadow-lg">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
      Welcome Back!
    </h2>

    {error && (
      <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center font-semibold text-sm max-w-md w-full">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
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
          className={`w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-indigo-500 transition ${
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
          required
          placeholder="Enter your password"
          className={`w-full border rounded-lg px-5 py-3 focus:outline-none focus:border-indigo-500 transition ${
            formErrors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <div className="text-right mt-2">
          <Link to="/forgotPassword" className="text-indigo-600 hover:underline text-sm font-semibold">
            Forgot Password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition ${
          loading ? 'opacity-60 cursor-not-allowed' : ''
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