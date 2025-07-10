import React from "react";
import { useNavigate } from "react-router-dom"; // 

const AdminNavbar = () => {
  const navigate = useNavigate(); // <-- Hook usa
    const handleClick = () => {
    navigate('/admin/coupon');
  };
  return (
    <nav className="bg-[#2874F0] text-white shadow-md px-6 py-3 flex justify-between items-center ">
      {/* Logo / Brand */}
      <div className="text-xl font-bold tracking-wide">Little-Hope</div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6 text-sm font-medium">
        <li className="hover:text-yellow-400 cursor-pointer" onClick={handleClick}>Dashboard</li>
        <li className="hover:text-yellow-400 cursor-pointer">Users</li>
        <li className="hover:text-yellow-400 cursor-pointer">Orders</li>
        <li className="hover:text-yellow-400 cursor-pointer">Products</li>
        <li className="hover:text-yellow-400 cursor-pointer">Coupons</li>
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
        <button className="bg-yellow-400 text-[#2874F0] font-semibold px-3 py-1 rounded hover:bg-yellow-300">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
