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
    <div className=" flex justify-center items-start min-h-screen lg:mt-14 mt-7 px-4 bg-[#fefefe]">
  <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-md rounde px-8 py-12">
<div className="flex justify-center items-center mb-4 -translate-y-6">
  <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
</div>

    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 leading-snug">
      Your Order Has Been Placed
    </h1>

    <p className="text-gray-700 text-base mb-8 leading-relaxed font-light">
      Thank you for placing your order with <span className="font-medium text-pink-500">Little Hope</span>. 
      You’ll receive a detailed confirmation via email shortly. Our team is preparing your items with care.
    </p>

    <div className="bg-[#fff9fa] border-l-4 border-pink-400 px-6 py-4 mb-10">
      <p className="text-sm text-gray-800 italic">
        “You’ve earned <span className="font-bold text-pink-500">20 LittlePoints</span> on this purchase. Use them to save on your next order.”
      </p>
    </div>

    <div className="flex justify-start">
      <button
        onClick={handleViewOrders}
        disabled={isLoading}
        className={`px-6 py-3 rounded-full text-sm font-medium tracking-wide border transition-all duration-300
          ${isLoading
            ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
            : "bg-black text-white border-black hover:bg-white hover:text-black"}`}
      >
        {isLoading ? "Loading..." : "View My Orders"}
      </button>
    </div>

    <div className="mt-10 text-xs text-gray-400 tracking-wide text-left">
      A confirmation message was sent to your email and phone. If you don’t see it, check your spam folder.
    </div>
  </div>
</div>

    </>
  );
}
