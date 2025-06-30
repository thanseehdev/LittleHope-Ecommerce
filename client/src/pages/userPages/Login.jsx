import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
      name: "",
      password: "",
    });
    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("OTP sent to: " + identifier);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-xl  p-6 sm:p-10">
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
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:outline-none"
            />
          </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-300"
          >
            CONTINUE
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          New to LittleHope?{' '}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
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