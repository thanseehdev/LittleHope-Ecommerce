import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaRegUser,
  FaHeart,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaEnvelope,
  FaBox,
  FaPhone,
  FaInfoCircle,
  FaComments,
  FaTag  
} from "react-icons/fa";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // New state for dropdown visibility
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <nav className="w-full shadow-sm border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-[1300px] mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <img src="/LittleHope-Logo-Img.png" alt="Logo" className="h-10 w-auto" />

          {/* Desktop Search */}
          <div className="flex-1 mx-6 hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-1/2 border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 text-gray-700 text-xs">
            {/* Only show Bag and Menu on small devices */}
            <div className="md:hidden flex items-center space-x-4">
              <div className="flex flex-col items-center hover:text-pink-600 transition cursor-pointer">
                <FaShoppingBag size={18} />
                <span className="text-xs">Bag</span>
              </div>
              <div
                className="flex flex-col items-center hover:text-pink-600 transition cursor-pointer"
                onClick={() => setIsDrawerOpen(true)}
              >
                <FaBars size={20} />
                <span className="text-xs">Menu</span>
              </div>
            </div>

            {/* Show these on md and above */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Profile Section with Dropdown */}
              <div
                className="relative flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setIsProfileDropdownOpen(true)} // Show dropdown on hover
                onMouseLeave={() => setIsProfileDropdownOpen(false)} // Hide dropdown on mouse leave
              >
                <FaRegUser size={18} />
                <span className="mt-1">Profile</span>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute top-10 left-0 bg-white shadow rounded-md w-62 h-50 py-2 text-gray-700">
                    <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover:text-pink-600">
                      <FaRegUser size={18} />
                      <span>Profile</span>
                    </div>
                    <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover:text-pink-600">
                      <FaBox size={18} />
                      <span>Orders</span>
                    </div>
                    <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover:text-pink-600">
                      <FaTag size={18} />
                      <span>Coupons</span>
                    </div>
                    <div
                      onClick={handleClick}
                      className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover:text-pink-600"
                    >
                      <FaComments size={18} />
                      <span>Contact</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center hover:text-pink-600 transition cursor-pointer">
                <FaHeart size={18} />
                <span className="mt-1">Wishlist</span>
              </div>
              <div className="flex flex-col items-center hover:text-pink-600 transition cursor-pointer">
                <FaShoppingBag size={18} />
                <span className="mt-1">Bag</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-xl font-semibold text-pink-400">LittleHope</div>
          <FaTimes
            className="text-gray-600 cursor-pointer"
            onClick={() => setIsDrawerOpen(false)}
          />
        </div>
        <div className="p-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-pink-300 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="flex items-center  rounded py-1 space-x-2 cursor-pointer hover:text-pink-600">
            <FaRegUser />
            <span>Profile</span>
          </div>
          <div className="flex items-center  rounded space-x-2 py-1 cursor-pointer hover:text-pink-600">
            <FaHeart />
            <span>Wishlist</span>
          </div>
          <div className="flex items-center  rounded space-x-2 py-1 cursor-pointer hover:text-pink-600">
            <FaBox />
            <span>Orders</span>
          </div>
          <div onClick={handleClick} className="flex items-center  rounded space-x-2 py-1 cursor-pointer hover:text-pink-600">
            <span> <FaComments /></span>
            <span>Contact</span>
          </div>
          <div className="flex items-center rounded space-x-2 py-1 cursor-pointer hover:text-pink-600">
            <FaInfoCircle />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Backdrop when drawer is open */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;








