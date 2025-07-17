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

// ✅ Add this BEFORE the Navbar component
const DrawerItem = ({ icon, label, onClick }) => (
  <div
    className="flex items-center space-x-3 py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100 hover:text-pink-600 transition"
    onClick={onClick}
  >
    <div className="text-pinl-500">{icon}</div>
    <div>{label}</div>
  </div>
);
const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // New state for dropdown visibility
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/test');
  };

  return (
    <>
      <nav className="w-full  border-b  sticky top-0 z-50  bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-[1300px] mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <img src="/LittleHope-Logo-Img.png" alt="Logo" className="h-10 w-auto hidden lg:block" />
         {/* Mobile Search Box with Logo inside (visible only on small screens) */}
<div className="w-full block lg:hidden  mr-5">
  <div className="relative flex items-center border border-gray-300 rounded-md bg-white">
    {/* Logo inside input box */}
    <div className="pl-2">
      <img src="/LittleHope-Logo-Img.png" alt="Logo" className="h-6 w-auto" />
    </div>
    
 
    
<input
  type="text"
  placeholder='Search "Products"'
  className="flex-1 py-2 px-2 text-[16px] focus:outline-none"
/>


    <FaSearch className="text-gray-500 mr-2 hover:text-pink-500 text-sm" />
  </div>
</div>


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
      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img src="/LittleHope-Logo-Img.png" alt="Logo" className="h-8" />
          <FaTimes
            className="text-gray-600 cursor-pointer"
            onClick={() => setIsDrawerOpen(false)}
          />
        </div>



        {/* Drawer Items */}
        <div className="px-4 text-sm">
          {/* Section: Account */}

          <div className="py-2 text-xs text-gray-400 uppercase tracking-wide mt-2">Account</div>
          <div className="space-y-3">
            <DrawerItem icon={<FaRegUser />} label="Profile" />
            <DrawerItem icon={<FaHeart />} label="Wishlist" />
            <DrawerItem icon={<FaShoppingBag />} label="Bag" />
          </div>

          {/* Divider */}
          <div className="my-4 border-t" />

          {/* Section: Orders & Coupons */}
          <div className="py-2 text-xs text-gray-400 uppercase tracking-wide">Orders</div>
          <div className="space-y-3">
            <DrawerItem icon={<FaBox />} label="My Orders" />
            <DrawerItem icon={<FaTag />} label="Coupons" />
          </div>

          {/* Divider */}
          <div className="my-4 border-t" />

          {/* Section: Help & Settings */}
          <div className="py-2 text-xs text-gray-400 uppercase tracking-wide">Support</div>
          <div className="space-y-3">
            <DrawerItem icon={<FaComments />} label="Contact Us" onClick={handleClick} />
            <DrawerItem icon={<FaInfoCircle />} label="About" />
            <DrawerItem icon={<FaPhone />} label="Help Center" />
          </div>

          {/* Divider */}
          <div className="my-4 border-t" />

          {/* Logout */}
          <div className="border border-pink-500 font-bold text-pink-500">
  <DrawerItem icon={<FaInfoCircle />} label="LOG OUT" />
</div>
        </div>
        <p className="text-xs font-normal  pl-5 mt-5">Beta Version 1.03.44</p>
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








