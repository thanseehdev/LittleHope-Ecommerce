import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/user/userActions";
import { validateRegisterForm } from "../../utils/validation";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({})

  const { error, loading } = useSelector((state) => state.user)
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

    const errors = validateRegisterForm(form);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-md  p-6 sm:p-10">
        {/* Banner */}
        <div className="bg-orange-100 rounded-lg p-4 sm:p-6 mb-6 text-center">
          <h3 className="text-xl font-bold text-orange-500">Extra 5% OFF*</h3>
          <p className="text-sm sm:text-base mt-1 text-gray-700">
            Join us to grab more discounts + Free Shipping on First orders
          </p>
          <p className="text-sm text-purple-600 font-semibold mt-2">
            COUPON: <span className="font-bold">HOPE5</span>
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Log In/Register</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Id<span className="text-red-500">*</span>
            </label>
            {formErrors.email && (
              <div className="flex items-center">
                <span className="ml-1 w-5 h-5 bg-red-500 text-white text-center rounded-full flex items-center justify-center">
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
                <span className="ml-1 w-5 h-5 bg-red-500 text-white text-center rounded-full flex items-center justify-center">
                  !
                </span>
                <p className="text-red-500 ml-1 text-sm mb-1">{formErrors.password}</p>
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
          <a href="/register" className="text-blue-600 font-medium hover:underline underline">
            Register Here
          </a>
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