import React, { useEffect, useState } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const [isLoading, setIsLoading] = useState(false);
  const [showRain, setShowRain] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowRain(false), 3000); // hide rain after 3s
    return () => clearTimeout(timer);
  }, []);

  const handleViewOrders = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/order");
    }, 1500);
  };

  return (
    <>
      {/* 🌈 Fancy Color Rain Styles */}
      <style>{`
        .rain-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 50;
        }

        .drop {
          position: absolute;
          top: -10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          opacity: 0.85;
          animation: fall 3s ease-in-out forwards;
        }

        .shape-square {
          border-radius: 2px;
        }

        .shape-sparkle {
          width: 6px;
          height: 6px;
          transform: rotate(45deg);
          border-radius: 1px;
        }

        @keyframes fall {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          80% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(100vh) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>

      {/* 🎉 Animated Confetti-Like Rain */}
      {showRain && (
        <div className="rain-container">
          {[...Array(60)].map((_, i) => {
            const left = Math.random() * 100;
            const duration = 2 + Math.random() * 1.5;
            const delay = Math.random();
            const colors = ["#f472b6", "#a78bfa", "#60a5fa", "#34d399", "#facc15", "#fdba74"];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shapes = ["", "shape-square", "shape-sparkle"];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            return (
              <span
                key={i}
                className={`drop ${shape}`}
                style={{
                  left: `${left}%`,
                  backgroundColor: color,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                }}
              ></span>
            );
          })}
        </div>
      )}

      <Navbar />

      {/* 🧾 Main Order Success Content */}
      <div className="flex justify-center items-start min-h-screen lg:mt-14 mt-7 px-4 bg-[#fefefe]">
        <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-md rounded-lg px-8 py-12 transition-all duration-500">
          <div className="flex justify-center items-center mb-4 -translate-y-6">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 leading-snug">
            Your Order Has Been Placed
          </h1>

          <p className="text-gray-700 text-base mb-8 leading-relaxed font-light">
            Thank you for placing your order with{" "}
            <span className="font-medium text-pink-500">Little Hope</span>. You’ll receive a detailed confirmation via
            email shortly. Our team is preparing your items with care.
          </p>

          <div className="bg-[#fff9fa] border-l-4 border-pink-400 px-6 py-4 mb-10">
            <p className="text-sm text-gray-800 italic">
              “You’ve earned{" "}
              <span className="font-bold text-pink-500">20 LittlePoints</span> on this purchase. Use them to save on
              your next order.”
            </p>
          </div>

          <div className="flex justify-start">
            <button
              onClick={handleViewOrders}
              disabled={isLoading}
              className={`px-6 py-3 rounded-full text-sm font-medium tracking-wide border transition-all duration-300
                ${isLoading
                  ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                  : "bg-black text-white border-black hover:bg-white hover:text-black"
                }`}
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



