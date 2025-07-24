import React from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile } from "../../redux/features/user/profile/profileAction";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from '@heroicons/react/20/solid';
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
  { name: "Coupons", icon: <AiOutlineGift size={19} />, path: "/coupon" },
  { name: "Address", icon: <FiMapPin size={19} />, path: "/profile" },
  { name: "Help", icon: <FiHelpCircle size={19} />, path: "/contact" },
];


const AccountPage = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate()
  const { profileUser, loading, error } = useSelector((state) => state.profile);
  const userState = useSelector((state) => state.user)
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
        <div className="fixed z-50 max-w-sm w-full left-1/2 -translate-x-1/2 sm:top-6 bottom-4 sm:bottom-auto px-4 py-3 rounded-lg shadow-md flex items-center justify-between bg-white border border-gray-200">
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

      {/* Main Container */}
      <main className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="lg:max-w-6xl max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Sidebar - Profile + Actions */}
          <aside className="space-y-6 lg:col-span-1">
            {/* Profile Card */}

            <div className="max-w-sm mx-auto bg-white border border-gray-200  shadow overflow-hidden">
              <div className="bg-gradient-to-tr from-blue-500 to-indigo-700 px-6 py-4">
                <h2 className="text-white text-xl font-bold">
                  {profileUser?.name || "Guest"}
                </h2>
                <p className="text-blue-100 text-sm">{profileUser?.email || "No email provided"}</p>
              </div>
              <div className="p-6 flex items-center space-x-4">
                <div className="w-14 shadow-md -rotate-12 h-14 rounded bg-gradient-to-tr from-blue-500 to-indigo-700 flex items-center justify-center text-white text-xl font-semibold">
                  {profileUser?.name?.charAt(0).toUpperCase() || "G"}
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 text-sm">
                    Welcome to your profile! You can manage your orders, view activity, and more.
                  </p>
                </div>
              </div>
            </div>


         {/* Quick Actions */}
<div className="grid  grid-cols-2 gap-4">
  {quickActions.map((item) => (
    <Link
      to={item.path}
      key={item.name}
      className="flex lg:max-w-sm lg:mx-auto  justify-between items-center p-4 lg:py-6 lg:h-14 lg:w-40 bg-white border rounded-sm hover:shadow transition"
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-500">{item.icon}</div>
        <p className="text-xs font-medium text-gray-700">{item.name}</p>
      </div>
      <div className="text-gray-400 text-sm"><ChevronRightIcon className="w-4 h-4 text-gray-400" /></div>
    </Link>
  ))}
</div>


            <div className="lg:ml-4 hidden lg:block md:block flex justify-center mt-5">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className=" w-[330px] py-2 text-red-600 border border-red-300 rounded-md font-semibold hover:bg-red-100 transition"
          >
            LOG OUT
          </button>
        </div>
        <div className="hidden lg:block flex justify-center mt-5">
          <p className="text-xs text-gray-400 text-center">Beta Version 4.2506.20</p>
        </div>
          </aside>


           <div class="hidden lg:block md:block  lg:col-span-2">
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
                    className="bg-white w-[800px] p-6 rounded-md shadow-sm hover:shadow transition cursor-pointer"
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
               
              </div>
            </div>
        </div>


        <div className="sm:hidden flex justify-center mt-5">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="mt-10  w-[330px] py-2 text-red-600 border border-red-300 rounded-md font-semibold hover:bg-red-100 transition"
          >
            LOG OUT
          </button>
        </div>
        <div className="sm:hidden flex justify-center mt-5">
          <p className="text-xs text-gray-400 text-right">Beta Version 4.2506.20</p>
        </div>
      </main>


      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[90%] sm:w-80 p-6 shadow-lg">
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
    </>



  );
};

export default AccountPage;



