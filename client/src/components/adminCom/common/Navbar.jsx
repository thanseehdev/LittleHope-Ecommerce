import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '../../../redux/features/user/userSlice';
import { logoutUser } from "../../../redux/features/user/userActions";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(logout());
      navigate('/user/login');
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <nav className="bg-[#2874F0] text-white shadow-md px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wide">Little-Hope</div>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/admin/dashboard"><li className="hover:text-yellow-400 cursor-pointer">Dashboard</li></Link>
          <Link to="/admin/user"><li className="hover:text-yellow-400 cursor-pointer">Users</li></Link>
          <Link to="/admin/orders"><li className="hover:text-yellow-400 cursor-pointer">Orders</li></Link>
          <Link to="/admin/product"><li className="hover:text-yellow-400 cursor-pointer">Products</li></Link>
          <Link to="/admin/coupon"><li className="hover:text-yellow-400 cursor-pointer">Coupons</li></Link>
          <li className="hover:text-yellow-400 cursor-pointer">Reports</li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Profile & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 text-[#2874F0] rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <span className="hidden sm:block">Admin</span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 text-[#2874F0] font-semibold px-3 py-1 rounded hover:bg-yellow-300"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden absolute top-16 left-0 right-0 bg-[#2874F0] text-white flex flex-col gap-4 p-6 text-sm font-medium">
          <Link to="/admin/dashboard"><li className="hover:text-yellow-400 cursor-pointer">Dashboard</li></Link>
          <Link to="/admin/user"><li className="hover:text-yellow-400 cursor-pointer">Users</li></Link>
          <Link to="/admin/orders"><li className="hover:text-yellow-400 cursor-pointer">Orders</li></Link>
          <Link to="/admin/product"><li className="hover:text-yellow-400 cursor-pointer">Products</li></Link>
          <Link to="/admin/coupon"><li className="hover:text-yellow-400 cursor-pointer">Coupons</li></Link>
          <li className="hover:text-yellow-400 cursor-pointer">Reports</li>
        </ul>
      )}

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-sm w-full">
            <p className="text-gray-800 text-center text-lg mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;

