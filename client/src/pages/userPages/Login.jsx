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
    <div className="min-h-screen flex bg-gradient-to-br from-pink-100 to-white items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-xl lg:bg-white lg:shadow-md  overflow-hidden p-6 sm:p-10">
        {/* Banner */}
        <div className="lg:bg-orange-100 bg-white rounded-lg shadow p-4 sm:p-6 mb-6 text-center">
          <h3 className="text-xl font-bold text-orange-500">FLAT ₹100 OFF*</h3>
          <p className="text-sm sm:text-base mt-1 text-gray-700">
            Join us to grab more discounts + Free Shipping on First orders
          </p>
          <p className="text-sm text-purple-600 font-semibold mt-2">
            COUPON: <span className="font-bold"> HOPE100 </span>
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Log In</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Id<span className="text-red-500">*</span>
            </label>
            {formErrors.email && (
              <div className="flex items-center">
                <span className=" w-5 h-5 bg-red-500 text-white text-center rounded-full flex items-center justify-center">
                  !
                </span>
                <p className="text-red-500 ml-1 text-sm mb-1">{formErrors.email}</p>
              </div>
            )}
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              placeholder="Enter your email address"
              className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 rounded-md   shadow-sm  focus:outline-none focus:border-green-500`}
            />

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            {formErrors.password && (
              <div className="flex items-center">
                <span className=" w-11 lg:w-9 h-5 bg-red-500 text-white text-center rounded-full flex items-center justify-center">
                  !
                </span>
                <p className="text-red-500 ml-4 text-sm mb-1">{formErrors.password}</p>
              </div>
            )}
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              placeholder="Enter your password"
              className={`w-full border ${formErrors.password ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 rounded-md   shadow-sm  focus:outline-none focus:border-green-500`}
            />

            <div className="text-right text-sm mt-1">
              <Link to="/forgotPassword" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'CONTINUE'}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          New to LittleHope?{' '}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline underline"
          >
            Register here
          </Link>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you agree to LittleHope's{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> and{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}