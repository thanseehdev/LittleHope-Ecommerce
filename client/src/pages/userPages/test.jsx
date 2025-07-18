import React from "react";
import Navbar from "../../components/userCom/common/Navbar";
import {
  FiPackage,
  FiHeart,
  FiHelpCircle,
  FiMapPin,
  FiShoppingCart,
} from "react-icons/fi";
import { AiOutlineGift } from "react-icons/ai";

const quickActions = [
  { name: "Orders", icon: <FiPackage size={19} /> },
   { name: "Cart", icon: <FiShoppingCart size={19} /> },
  { name: "Wishlist", icon: <FiHeart size={19} /> },
  { name: "Coupons", icon: <AiOutlineGift size={19} /> },
   { name: "Address", icon: <FiMapPin size={19} /> },
  { name: "Help", icon: <FiHelpCircle size={19} /> },
];

const AccountPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white font-sans">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">My Account</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Profile & Actions */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-gray-100  p-6 flex flex-col sm:flex-row sm:items-center gap-4 ">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-pink-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
                    T
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Thanseeh
                  </h2>
                  <p className="text-sm text-gray-600">thanseeh@gmail.com</p>
                </div>
                <span className="bg-green-500 text-white text-xs px-3 py-1 w-[70px] rounded-full font-semibold">
                  Verified
                </span>
              </div>

              {/* Quick Actions */}
             <div className="grid grid-cols-2 sm:grid-cols-3  gap-4">
  {quickActions.map((item) => (
    <div
      key={item.name}
      className="bg-white shadow rounded-lg p-4 flex items-center hover:bg-gray-100 transition"
    >
      <div className="text-2xl mr-3 text-gray-700">{item.icon}</div>
      <p className="text-sm font-medium text-gray-800">{item.name}</p>
    </div>
  ))}
</div>



              {/* Logout */}
              <div className="text-center">
                <button className="w-full py-2 mt-5  text-red-600 border border-red-300 rounded-md font-semibold hover:bg-red-200 transition">
                  LOG OUT
                </button>
              </div>
            </div>

            {/* Right Panel - Account Options */}
            <div className="lg:col-span-2 space-y-4">
              {[
                {
                  title: "Ultimate Glam Clan",
                  subtitle: "Myntra Influencer program for shoppers",
                  badge: "NEW",
                },
                {
                  title: "Payments & Currencies",
                  subtitle: "View balance and saved payment methods",
                },
                {
                  title: "Earn & Redeem",
                  subtitle: "View prizes and earn rewards",
                },
                {
                  title: "Manage Account",
                  subtitle: "Manage your account and saved addresses",
                },
                {
                  title: "Wishlist",
                  subtitle: "Your most loved styles",
                },
                {
                  title: "Settings",
                  subtitle: "Manage Notifications",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg shadow hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-md font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-sm text-gray-500">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                    {item.badge && (
                      <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
              <p className="text-xs text-gray-400 mt-2 ml-2">
                  Beta Version 4.2506.20
                </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;



