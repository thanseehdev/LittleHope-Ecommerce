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

  {/* Alert */}
  {(userState.message || userState.error) && (
    <div
      className="fixed z-50 max-w-sm w-full left-1/2 -translate-x-1/2 sm:top-6 bottom-4 sm:bottom-auto px-4 py-3 rounded-lg shadow-md flex items-center justify-between bg-white border border-gray-200"
      role="alert"
    >
      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
        {userState.error ? (
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
        ) : (
          <CheckCircleIcon className="h-5 w-5 text-green-500" />
        )}
        {userState.message || userState.error}
      </span>

      <button
        onClick={() => dispatch(clearCartMessage())}
        className="text-gray-400 hover:text-gray-600 transition"
        aria-label="Close alert"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  )}

  {/* Main Layout */}
  <main className="min-h-screen bg-gray-100 font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="grid gap-8 md:grid-cols-3">

        {/* Sidebar - Profile & Actions */}
        <aside className="space-y-6">

          {/* Profile Card */}
          <div className="  p-6 flex flex-col bg-white  border-l-4 border-pink-500  rounded-md">
            <div className="w-20 h-20 bg-pink-600 text-white flex items-center justify-center rounded-full text-3xl font-bold">
              {profileUser?.name?.charAt(0).toUpperCase() || "G"}
            </div>
            <h2 className="text-lg font-semibold mt-4 text-gray-900">
              {profileUser?.name || "Guest"}
            </h2>
            <p className="text-sm text-gray-600">{profileUser?.email}</p>
            
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className="bg-white border rounded-lg p-4 flex items-center hover:shadow transition"
              >
                <div className="text-2xl text-pink-600 mr-3">{item.icon}</div>
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
              </Link>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full py-2 text-red-600 border border-red-300 rounded-md font-semibold hover:bg-red-100 transition"
          >
            LOG OUT
          </button>

          {/* Logout Modal */}
          {showLogoutConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl w-80 p-6 shadow-lg">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">Are you sure?</h2>
                <p className="text-sm text-gray-500 mb-6">Do you really want to log out?</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-medium"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Settings/Content Area */}
        <section className="md:col-span-2 space-y-5">
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
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                  )}
                </div>
                {item.badge && (
                  <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
          <p className="text-xs text-gray-400 text-right mt-4">
            Beta Version 4.2506.20
          </p>
        </section>
      </div>
    </div>
  </main>
</>


  );
};

export default AccountPage;



