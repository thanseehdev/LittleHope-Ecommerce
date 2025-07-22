import React, { useEffect, useState } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../redux/features/user/profile/profileAction";
import { logout } from "../../redux/features/user/userSlice";
import { logoutUser } from "../../redux/features/user/userActions";
import {
  FiPackage, FiHeart, FiHelpCircle, FiMapPin, FiShoppingCart,
} from "react-icons/fi";
import { AiOutlineGift } from "react-icons/ai";
import {
  XMarkIcon, CheckCircleIcon, ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const quickActions = [
  { name: "Orders", icon: <FiPackage size={18} />, path: "/order" },
  { name: "Cart", icon: <FiShoppingCart size={18} />, path: "/cart" },
  { name: "Wishlist", icon: <FiHeart size={18} />, path: "/wishlist" },
  { name: "Coupons", icon: <AiOutlineGift size={18} />, path: "/profile" },
  { name: "Address", icon: <FiMapPin size={18} />, path: "/profile" },
  { name: "Help", icon: <FiHelpCircle size={18} />, path: "/contact" },
];

const AccountPage = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileUser } = useSelector((state) => state.profile);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      {/* Alert Notification */}
      {(userState.message || userState.error) && (
        <div className="fixed z-50 w-fit left-1/2 -translate-x-1/2 top-6 bg-white border rounded-md shadow px-4 py-2 flex items-center gap-2">
          {userState.error ? (
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          )}
          <span className="text-sm text-gray-800">
            {userState.message || userState.error}
          </span>
          <button onClick={() => dispatch(clearCartMessage())}>
            <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      )}

      {/* Main */}
      <main className="min-h-screen bg-gray-50 font-sans">
        <div className="max-w-5xl mx-auto px-4 py-8">

          {/* Profile Overview */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/3 space-y-6">
              {/* Profile Info */}
              <div className="bg-white rounded-md p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">
                  {profileUser?.name || "Guest"}
                </h2>
                <p className="text-sm text-gray-500">{profileUser?.email}</p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((item) => (
                  <Link
                    to={item.path}
                    key={item.name}
                    className="bg-white rounded-md p-3 flex items-center gap-3 text-sm text-gray-700 shadow-sm hover:shadow transition"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full py-2 text-red-500 border border-red-300 rounded-md hover:bg-red-50 transition text-sm font-semibold"
              >
                Log Out
              </button>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-2/3 space-y-4">
              {[
                {
                  title: "Ultimate Glam Clan",
                  subtitle: "LittleHope Influencer Program",
                  badge: "NEW",
                },
                {
                  title: "Payments & Currencies",
                  subtitle: "Manage your cards & currency",
                },
                {
                  title: "Earn & Redeem",
                  subtitle: "Track and redeem your rewards",
                },
                {
                  title: "Manage Account",
                  subtitle: "Edit profile & address book",
                },
                {
                  title: "Wishlist",
                  subtitle: "Your favorite products",
                },
                {
                  title: "Settings",
                  subtitle: "Notification preferences",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-md shadow-sm hover:shadow transition cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-base font-medium text-gray-800">{item.title}</h3>
                      {item.subtitle && (
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      )}
                    </div>
                    {item.badge && (
                      <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-400 text-right">Beta Version 4.2506.20</p>
            </div>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-md p-6 w-80 shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-1.5 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountPage;


// account center profile card
{/* <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-xl shadow overflow-hidden">
  <div className="bg-blue-600 px-6 py-4">
    <h2 className="text-white text-xl font-bold">
      {profileUser?.name || "Guest"}
    </h2>
    <p className="text-blue-100 text-sm">{profileUser?.email || "No email provided"}</p>
  </div>
  <div className="p-6 flex items-center space-x-4">
    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-semibold">
      {profileUser?.name?.charAt(0).toUpperCase() || "G"}
    </div>
    <div className="flex-1">
      <p className="text-gray-600 text-sm">
        Welcome to your profile! You can manage your settings, view activity, and more.
      </p>
    </div>
  </div>
  <div className="px-6 pb-4">
    <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium">
      Edit Profile
    </button>
  </div>
</div> */}

//another
{/* <div className="max-w-md mx-auto flex border rounded-xl shadow-sm overflow-hidden">
  <div className="w-24 bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
    {profileUser?.name?.charAt(0).toUpperCase() || "G"}
  </div>
  <div className="flex-1 p-6 bg-white">
    <h2 className="text-xl font-semibold text-gray-900">{profileUser?.name || "Guest"}</h2>
    <p className="text-sm text-gray-600 mt-1">{profileUser?.email || "No email provided"}</p>
    <div className="mt-4 p-3 bg-gray-50 rounded-md text-gray-700 text-sm">
      Welcome back! You last logged in 2 days ago.
    </div>
  </div>
</div> */}

// bg-gradient-to-tr from-purple-500 to-pink-500


{/* <div className="max-w-sm mx-auto border-l-8 border-teal-500 bg-white rounded-r-xl shadow-lg p-6 flex flex-col space-y-4">
  <div className="flex items-center space-x-4">
    <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-white text-3xl font-bold">
      {profileUser?.name?.charAt(0).toUpperCase() || "G"}
    </div>
    <div>
      <h2 className="text-xl font-bold text-gray-900">{profileUser?.name || "Guest"}</h2>
      <p className="text-sm text-gray-600">{profileUser?.email || "No email provided"}</p>
    </div>
  </div>
  <p className="text-gray-700 text-sm italic border-t border-gray-200 pt-3">
    {profileUser?.bio || "A passionate user who loves exploring new designs."}
  </p>
</div> */}


{/* <div className="max-w-sm mx-auto flex rounded-l-xl overflow-hidden  border-gray-300">
  <div className="w-24 bg-gradient-to-b from-pink-500 to-red-400 flex items-center justify-center text-white text-4xl font-bold">
    {profileUser?.name?.charAt(0).toUpperCase() || "G"}
  </div>
  <div className="flex flex-col justify-center p-6 bg-white flex-1">
    <h2 className="text-xl font-semibold text-gray-900">{profileUser?.name || "Guest"}</h2>
    <p className="text-gray-600 mt-1 text-sm">{profileUser?.email || "No email provided"}</p>
  </div>
</div> */}

{/* <div className="max-w-sm mx-auto  rounded-lg   p-6 flex items-center space-x-6">
  <div className="w-16 h-16 bg-pink-500 text-white text-3xl font-extrabold flex items-center justify-center rounded-md transform -rotate-12 shadow-md">
    {profileUser?.name?.charAt(0).toUpperCase() || "G"}
  </div>
  <div>
    <h2 className="text-xl font-bold text-gray-900">{profileUser?.name || "Guest"}</h2>
    <p className="text-gray-600 mt-1 text-sm">{profileUser?.email || "No email provided"}</p>
  </div>
</div> */}