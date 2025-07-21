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

  {/* Alert Message */}
  {(userState.message || userState.error) && (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2 rounded shadow flex items-center gap-3"
      role="alert"
    >
      {(userState.error || userState.error) ? (
        <ExclamationCircleIcon className="w-5 h-5 text-red-400" />
      ) : (
        <CheckCircleIcon className="w-5 h-5 text-green-400" />
      )}
      <span>{userState.message || userState.error}</span>
      <button
        onClick={() => dispatch(clearCartMessage())}
        aria-label="Close alert"
      >
        <XMarkIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  )}

  <main className="bg-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    {/* Profile Header */}
    <section className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-pink-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
          {profileUser?.name?.charAt(0).toUpperCase() || "G"}
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{profileUser?.name || "Guest"}</h1>
          <p className="text-sm text-gray-500">{profileUser?.email}</p>
        </div>
      </div>
      <span className="mt-4 sm:mt-0 text-xs text-green-600 border border-green-500 px-3 py-1 w-20 rounded-full uppercase">
        Verified
      </span>
    </section>

    {/* Quick Links */}
    <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-10">
      {quickActions.map((item) => (
        <Link
          to={item.path}
          key={item.name}
          className="border border-gray-200 hover:bg-gray-50 rounded p-3 flex flex-col items-center gap-1 text-gray-700 text-center"
        >
          <div className="text-xl">{item.icon}</div>
          <span>{item.name}</span>
        </Link>
      ))}
    </section>

    {/* Main Options */}
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-sm">
      {[
        { title: "Ultimate Glam Clan", subtitle: "Influencer program", badge: "NEW" },
        { title: "Payments & Currencies", subtitle: "Saved cards & wallet" },
        { title: "Earn & Redeem", subtitle: "Your rewards & prizes" },
        { title: "Manage Account", subtitle: "Profile, passwords & addresses" },
        { title: "Wishlist", subtitle: "Saved items" },
        { title: "Settings", subtitle: "Notifications & preferences" },
      ].map((item, idx) => (
        <div key={idx} className="border-b border-gray-200 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-base">{item.title}</h3>
              <p className="text-gray-500">{item.subtitle}</p>
            </div>
            {item.badge && (
              <span className="text-xs text-pink-600 border border-pink-400 px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
        </div>
      ))}
    </section>

    {/* Logout */}
    <div className="mt-10">
      <button
        onClick={() => setShowLogoutConfirm(true)}
        className="w-full py-2 text-red-600 border border-red-300 rounded hover:bg-red-50 transition"
      >
        LOG OUT
      </button>
    </div>

    {/* Logout Confirmation */}
    {showLogoutConfirm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
          <h2 className="font-semibold text-lg mb-3">Log out?</h2>
          <p className="text-gray-500 text-sm mb-6">Are you sure you want to log out?</p>
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="flex-1 py-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    )}
  </main>

  {/* Version Note */}
  <p className="text-center text-xs text-gray-400 mt-6">Beta Version 4.2506.20</p>
</>

  );
};

export default AccountPage;