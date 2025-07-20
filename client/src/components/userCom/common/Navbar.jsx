import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCartItems } from "../../../redux/features/user/cart/cartAction";
import { Link } from 'react-router-dom';

import {
  FaSearch,
  FaRegUser,
  FaHeart,
  FaShoppingBag,
  FaBox,
  FaComments,
  FaTag,
  FaUser
} from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";


const DrawerItem = ({ icon, label, onClick }) => (
  <div
    className="flex items-center space-x-3 py-2 px-2 rounded-md cursor-pointer hover:bg-gray-100 hover:text-pink-600 transition"
    onClick={onClick}
  >
    <div className="text-pink-500">{icon}</div>
    <div>{label}</div>
  </div>
);

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();

  console.log('cart count:', cartCount);


  // Removed isDrawerOpen state because drawer is removed
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/test');
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      dispatch(getCartItems());
    }
  }, [dispatch, cartItems.length]);


  return (
    <>
      <nav className="w-full border-b sticky top-0 z-50 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-[1300px] mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <img src="/LittleHope-Official-Logo2.png" alt="Logo" className="h-12 w-auto hidden lg:block" />

          {/* Mobile Search Box with Logo inside (visible only on small screens) */}
          <div className="w-full block lg:hidden mr-5">
            <div className="relative flex items-center border border-gray-300 rounded-full bg-white px-2">
              <div className="mr-2">
                <img
                  src="/LittleHope-Official-Logo2.png"
                  alt="Little Hope Logo"
                  className="w-auto h-6 rounded-full bg-pink-50"
                />
              </div>
              <input
                type="text"
                placeholder='Search "Products"'
                className="flex-1 w-full py-2 px-2 text-[16px] focus:outline-none"
              />
              <button type="submit" className="mr-2">
                <FaSearch className="text-gray-500 hover:text-pink-500 text-sm" />
              </button>
            </div>
          </div>


          {/* Desktop Search */}
          <div className="flex-1 mx-6 hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-1/2 border bg-white border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 text-gray-700 text-xs">
            {/* On small devices: Show User icon + Account text instead of Menu */}
            <div className="md:hidden flex items-center space-x-3">

              <div className="flex flex-col items-center hover:text-pink-600 transition cursor-pointer">
                <Link to="/wishlist" title="wishlist">
                  <MdFavoriteBorder size={21} />
                </Link>
              </div>

              <div className="relative flex flex-col items-center hover:text-pink-600 transition cursor-pointer">
                <Link to="/cart" title="Cart">
                  <AiOutlineShoppingCart size={23} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
              <div className="flex flex-col items-center hover:text-pink-600 transition cursor-pointer">
                <Link to="/account" title="account">
                  <FaRegUser size={18} />
                </Link>
              </div>
            </div>

            {/* Show these on md and above */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Profile Section with Dropdown */}
              <div
                className="relative flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                <FaUser size={18} className="hover:text-pink-600" />
                <span className="mt-1">Profile</span>

                {isProfileDropdownOpen && (
                  <div className="absolute top-10 left-0 bg-white shadow rounded-md w-62 h-50 py-2 text-gray-700">
                    <Link to="/account" title="account">
                      <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover:text-pink-600">

                        <FaUser size={18} />
                        <span>Account</span>
                      </div>
                    </Link>
                    <Link to="/order" title="order">
                      <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover:text-pink-600">
                        <FaBox size={18} />
                        <span>Orders</span>
                      </div>
                    </Link>
                    <Link to="/profile" title="profile">
                      <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover:text-pink-600">
                        <FaTag size={18} />
                        <span>Coupons</span>
                      </div>
                    </Link>
                    <Link to="/contact" title="profile">
                      <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover:text-pink-600">
                        <FaComments size={18} />
                        <span>Contact</span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/wishlist" title="profile">
                <div className="flex flex-col items-center hover:text-pink-600 transition cursor-pointer">
                  <FaHeart size={18} />
                  <span className="mt-1">Wishlist</span>
                </div>
              </Link>

              <Link to="/cart" title="profile">
                <div className="relative cursor-pointer transition hover:text-pink-600">
                  <FaShoppingBag size={18} />
                  <span className="text-sm mt-1">Bag</span>
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Removed drawer and backdrop */}
    </>
  );
};

export default Navbar;









