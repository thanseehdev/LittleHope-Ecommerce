import React from "react";
import { useNavigate } from "react-router-dom"; // 
import { Link } from 'react-router-dom';
import { logout } from '../../../redux/features/user/userSlice'
import { logoutUser } from "../../../redux/features/user/userActions";

const AdminNavbar = () => {
   const handleLogout = async () => {
      await dispatch(logoutUser())
      dispatch(logout())
      navigate('/login')
    }
  return (
    <nav className="bg-[#2874F0] text-white shadow-md px-6 py-3 flex justify-between items-center ">
      {/* Logo / Brand */}
      <div className="text-xl font-bold tracking-wide">Little-Hope</div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6 text-sm font-medium">
        <Link to="/admin/dashboard" title="wishlist">
        <li className="hover:text-yellow-400 cursor-pointer">Dashboard</li>
        </Link>
        <Link to="/admin/user" title="wishlist">
        <li className="hover:text-yellow-400 cursor-pointer">Users</li>
        </Link>
        <Link to="/admin/orders" title="wishlist">
        <li className="hover:text-yellow-400 cursor-pointer">Orders</li>
        </Link>
        <Link to="/admin/product" title="wishlist">
        <li className="hover:text-yellow-400 cursor-pointer">Products</li>
        </Link>
        <Link to="/admin/coupon" title="wishlist">
        <li className="hover:text-yellow-400 cursor-pointer">Coupons</li>
        </Link>
        <li className="hover:text-yellow-400 cursor-pointer">Reports</li>
      </ul>

      {/* Profile & Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 text-[#2874F0] rounded-full flex items-center justify-center font-bold">
            A
          </div>
          <span className="hidden sm:block">Admin</span>
        </div>
        <button onClick={handleLogout} className="bg-yellow-400 text-[#2874F0] font-semibold px-3 py-1 rounded hover:bg-yellow-300">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
