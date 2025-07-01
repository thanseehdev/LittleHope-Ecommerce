import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid"; // You'll need heroicons installed or replace with SVG/icon you like

import AdminNavbar from "../../components/adminCom/common/Navbar";

export default function CouponAdminPage() {
  const [coupons, setCoupons] = useState([
    { id: 1, code: "WELCOME10", discount: "10%", expires: "2025-12-31" },
    { id: 2, code: "SUMMER15", discount: "15%", expires: "2025-06-30" },
  ]);

  const addNewCoupon = () => {
    const newCoupon = {
      id: Date.now(),
      code: "NEWCOUPON",
      discount: "5%",
      expires: "2025-01-01",
    };
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  return (
    <>
   <AdminNavbar/>
    <div className="max-w-7xl mx-auto p-6 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">
          Coupon Management
        </h1>
        <button
          onClick={addNewCoupon}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          aria-label="Add New Coupon"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Coupon
        </button>
      </div>

      {/* Coupons grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map(({ id, code, discount, expires }) => (
          <div
            key={id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">{code}</h2>
              <p className="text-gray-600 text-lg mb-4">
                Discount: <span className="font-medium text-gray-800">{discount}</span>
              </p>
              <p className="text-gray-500">Expires on: <time dateTime={expires} className="font-medium">{expires}</time></p>
            </div>
            <button
              className="self-start mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-semibold transition"
              onClick={() =>
                setCoupons((prev) => prev.filter((coupon) => coupon.id !== id))
              }
              aria-label={`Delete coupon ${code}`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {coupons.length === 0 && (
        <p className="text-center text-gray-500 mt-16 text-lg">
          No coupons available. Click "Add New Coupon" to create one.
        </p>
      )}
    </div>
    </>
  );
}

