import React from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "../../components/userCom/common/Navbar";


export default function OrderSuccess() {
  return (
    <>
  <Navbar/>
      <div className="flex flex-col items-center px-4 py-12 mt-5 sm:mt-10 md:mt-24">
        <div className="bg-white max-w-md w-full rounded-xl border shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="text-pink-600 w-16 h-16" />
          </div>

          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-700 text-sm mb-6">
            Thank you for shopping with{" "}
            <span className="font-semibold">Little Hope</span>. Your order has
            been successfully placed and is being processed.
          </p>

          <div className="bg-pink-100 p-4 rounded mb-4">
            <p className="text-sm text-pink-800">
              🎁 You earned <strong>20 LittlePoints</strong> for this order.
              Use them in your next purchase!
            </p>
          </div>

          <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">
            View My Orders
          </button>

          <div className="mt-6 text-sm text-gray-500">
            You'll receive an SMS and Email confirmation shortly.
          </div>
        </div>
      </div>
    </>
  );
}