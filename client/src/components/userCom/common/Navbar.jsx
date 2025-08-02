import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCartItems } from "../../../redux/features/user/cart/cartAction";
import { Link, useLocation } from 'react-router-dom';
import { setQuery } from "../../../redux/features/user/product/newArrivalSlice";
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi';
import {
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaBox,
  FaComments,
  FaTag,
  FaUser
} from "react-icons/fa";



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
  const cartCount = cartItems.length;
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === '/home';
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholderWords = ['Boys', 'Girls', 'Casual'];


  // Removed isDrawerOpen state because drawer is removed
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderWords.length);
    }, 2500); // Change word every 2 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);


  useEffect(() => {
    if (cartItems.length === 0) {
      dispatch(getCartItems());
    }
  }, [dispatch, cartItems.length]);

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      dispatch(setQuery(searchInput));
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <>
      <nav className="w-full border-b border-gray-100 sticky top-0 z-50 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-[1300px] mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home">
            <img src="/LittleHope-Official-Logo2.png" alt="Logo" className="h-20  hidden lg:block" />
          </Link>
          {/* Mobile Search Box with Logo inside (visible only on small screens) */}
          <div className="w-full block lg:hidden  mr-5">
            <div className="relative flex items-center border border-gray-300 rounded-full bg-white px-2">
              <div className="mr-2">
                <Link to="/">
                  <img
                    src={isHome ? '/LittleHope-Official-Logo2.png' : '/homeLogo.png'}
                    alt="Site Logo"
                    className="w-auto h-10 rounded-full transition-opacity duration-500"
                  />
                </Link>
              </div>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                type="text"
                placeholder={`Search for '${placeholderWords[placeholderIndex]}'`}
                className="flex-1 w-full py-2 px-2 placeholder:text-sm text-[16px] focus:outline-none"
              />
              <button type="submit" className="mr-2">
                <FaSearch onClick={handleSearch} className="text-gray-500 h-[13px] hover:text-pink-500 text-sm" />
              </button>
            </div>
          </div>


          {/* Desktop Search */}
          <div className="flex-1 mx-6 hidden lg:block">
            <div className="relative">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                type="text"
                placeholder="Search for products, brands and more"
                className="w-1/2 border bg-white border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-pink-500"
              />
              <FaSearch onClick={handleSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center lg:space-x-6 text-gray-700 text-xs">
            {/* On small devices: Show User icon + Account text instead of Menu */}
            <div className="md:hidden flex items-center space-x-3">

              <div className="flex flex-col items-center hover:text-pink-600 transition cursor-pointer">
                <Link to="/wishlist" title="wishlist">
                  <HiOutlineHeart size={23} />
                </Link>
              </div>

              <div className="relative flex flex-col items-center hover:text-pink-600 transition cursor-pointer">
                <Link to="/cart" title="Cart">
                  <HiOutlineShoppingBag size={23} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
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
                <span className="mt-1 font-semibold">Profile</span>

                {isProfileDropdownOpen && (
                  <div className="absolute top-7 left-0 w-64 bg-white border border-gray-200  shadow-xl z-50 overflow-hidden">
                    <Link to="/account" title="Account">
                      <div className="group flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <FaUser size={20} className="text-gray-500 group-hover:text-pink-600 transition-colors duration-200" />
                        <span className="text-[15px] font-medium text-gray-800 group-hover:text-pink-600">Account</span>
                      </div>
                    </Link>
                    <hr className="border-t border-gray-100" />
                    <Link to="/order" title="Orders">
                      <div className="group flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <FaBox size={20} className="text-gray-500 group-hover:text-pink-600 transition-colors duration-200" />
                        <span className="text-[15px] font-medium text-gray-800 group-hover:text-pink-600">Orders</span>
                      </div>
                    </Link>
                    <hr className="border-t border-gray-100" />
                    <Link to="/coupon" title="Coupons">
                      <div className="group flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <FaTag size={20} className="text-gray-500 group-hover:text-pink-600 transition-colors duration-200" />
                        <span className="text-[15px] font-medium text-gray-800 group-hover:text-pink-600">Coupons</span>
                      </div>
                    </Link>
                    <hr className="border-t border-gray-100" />
                    <Link to="/contact" title="Contact">
                      <div className="group flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <FaComments size={20} className="text-gray-500 group-hover:text-pink-600 transition-colors duration-200" />
                        <span className="text-[15px] font-medium text-gray-800 group-hover:text-pink-600">Contact</span>
                      </div>
                    </Link>
                  </div>

                )}
              </div>

              <Link to="/wishlist" title="profile">
                <div className="flex flex-col items-center hover:text-pink-600 transition cursor-pointer">
                  <FaHeart size={18} />
                  <span className="mt-1 font-semibold">Wishlist</span>
                </div>
              </Link>

              <Link to="/cart" title="profile">
                <div className="relative cursor-pointer transition hover:text-pink-600 flex flex-col items-center">
                  <FaShoppingBag size={18} />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                  <span className="mt-1 font-semibold block">Bag</span>
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







