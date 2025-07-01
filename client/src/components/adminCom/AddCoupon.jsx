import React, { useState } from "react";
import AdminNavbar from "./common/Navbar";

export default function AddCoupon() {
  const [coupon, setCoupon] = useState({
    code: "",
    discount: "",
    expiry: "",
  });

  const handleChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the coupon details
    console.log("Coupon submitted:", coupon);
    alert("Coupon added successfully!");
    setCoupon({ code: "", discount: "", expiry: "" });
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl max-w-md w-full p-8 space-y-6 border border-gray-200"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Add Coupon
          </h2>

          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">
              Coupon Code
            </span>
            <input
              type="text"
              name="code"
              value={coupon.code}
              onChange={handleChange}
              placeholder="Enter coupon code"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
              focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">
              Discount (%)
            </span>
            <input
              type="number"
              name="discount"
              value={coupon.discount}
              onChange={handleChange}
              min="1"
              max="100"
              placeholder="e.g. 20"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
              focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-semibold mb-1 block">
              Expiry Date
            </span>
            <input
              type="date"
              name="expiry"
              value={coupon.expiry}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md
            focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </>
  );
}

