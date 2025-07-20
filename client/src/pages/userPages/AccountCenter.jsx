import React from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile } from "../../redux/features/user/profile/profileAction";
import { useEffect, useState } from "react";
import {
  FiPackage,
  FiHeart,
  FiHelpCircle,
  FiMapPin,
  FiShoppingCart,
} from "react-icons/fi";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { AiOutlineGift } from "react-icons/ai";
import { logout } from '../../redux/features/user/userSlice'
import { logoutUser } from "../../redux/features/user/userActions";

const quickActions = [
  { name: "Orders", icon: <FiPackage size={19} />, path: "/order" },
  { name: "Cart", icon: <FiShoppingCart size={19} />, path: "/cart" },
  { name: "Wishlist", icon: <FiHeart size={19} />, path: "/wishlist" },
  { name: "Coupons", icon: <AiOutlineGift size={19} />, path: "/profile" },
  { name: "Address", icon: <FiMapPin size={19} />, path: "/profile" },
  { name: "Help", icon: <FiHelpCircle size={19} />, path: "/contact" },
];


const AccountPage = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate()
  const { profileUser, loading, error } = useSelector((state) => state.profile);
  const userState=useSelector((state)=>state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser())
    dispatch(logout())
    navigate('/login')
  }

  return (
    <>
      <Navbar />
      
            {(userState.message ||
              userState.error) && (
              <div
                className="fixed z-50 w-[92%] max-w-sm px-4 py-2 rounded-full text-sm font-semibold shadow-md
                flex items-center justify-between left-1/2 -translate-x-1/2
                bottom-4 sm:top-6 sm:bottom-auto bg-[#2e3142] text-white"
                role="alert"
              >
                <span className="flex items-center gap-2">
                  {(userState.error || userState.error) ? (
                    <ExclamationCircleIcon className="h-5 w-5 text-pink-500" />
                  ) : (
                    <CheckCircleIcon className="h-5 w-5 text-pink-500" />
                  )}
                  {userState.message || userState.error }
                </span>
      
                <button
                  onClick={() => {
                    dispatch(clearCartMessage());
                  }}
                  className="text-pink-500 hover:text-pink-400 transition ml-2"
                  aria-label="Close alert"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            )}
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
                    {profileUser?.name?.charAt(0).toUpperCase() || "G"}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {profileUser?.name || "Guest"}
                  </h2>
                  <p className="text-sm text-gray-600">{profileUser?.email}</p>

                </div>
                <span className="bg-green-500 text-white text-xs px-3 py-1 w-[70px] rounded-full font-semibold">
                  Verified
                </span>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {quickActions.map((item) => (
                  <Link
                    to={item.path}
                    key={item.name}
                    className="bg-white shadow rounded-lg p-4 flex items-center hover:bg-gray-100 transition"
                  >
                    <div className="text-2xl mr-3 text-gray-700">{item.icon}</div>
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  </Link>
                ))}
              </div>




              {/* Logout */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full py-2 mt-5 text-red-600 border border-red-300 rounded-md font-semibold hover:bg-red-200 transition"
              >
                LOG OUT
              </button>
              {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-gray-800 text-white p-6 rounded-lg w-80">
                    <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                    <p className="text-sm text-gray-300 mb-6">Do you really want to log out?</p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setShowLogoutConfirm(false)}
                        className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              )}

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



