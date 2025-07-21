import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Navbar from "../../components/userCom/common/Navbar";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleViewOrders = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/order");
    }, 1500); // 1.5 seconds for visible progress effect
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center px-4 py-12 mt-10">
        <div className="w-full max-w-xl bg-[#f7f7f7] rounded-lg shadow-sm border border-gray-200 p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="text-green-600 w-8 h-8" />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Your order has been placed!
            </h1>
          </div>

          <div className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
            Thank you for shopping with{" "}
            <span className="font-medium text-pink-500">Little Hope</span>. Your
            order is confirmed and will be processed shortly.
          </div>

          <div className="bg-white border border-gray-300 rounded-md px-4 py-3 mb-6">
            <p className="text-sm text-gray-900">
              🎉 You earned{" "}
              <span className="font-semibold text-pink-600">20 LittlePoints</span>.
              Redeem them on your next order!
            </p>
          </div>

          <button
            onClick={handleViewOrders}
            disabled={isLoading}
            className="relative w-full text-white py-3 rounded-md text-sm font-semibold tracking-wide overflow-hidden"
            style={{
              backgroundColor: "#f92b5bff",
            }}
          >
            {/* Progress background */}
            <span
              className={`absolute top-0 left-0 h-full bg-[#ec043aff]
                 transition-[width] duration-[1500ms] ease-linear ${
                isLoading ? "w-full" : "w-0"
              }`}
              style={{ zIndex: 0 }}
            ></span>

            {/* Button text above progress bar */}
            <span
              className={`relative z-10 flex justify-center text-white items-center ${
                isLoading ? "opacity-100" : "opacity-100"
              }`}
            >
              {isLoading ? "Loading..." : "VIEW ORDERS"}
            </span>
          </button>

          <div className="mt-6 text-xs text-gray-500 text-center">
            A confirmation has been sent to your registered Email and Phone number.
          </div>
        </div>
      </div>
    </>
  );
}
