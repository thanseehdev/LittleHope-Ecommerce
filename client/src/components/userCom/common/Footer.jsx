import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHelp } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";


export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Contact Info - Grid for desktop, stacked for mobile */}
        <div className="hidden lg:grid md:grid grid lg:text-base text-sm grid-cols-1 md:grid-cols-3 gap-10 mb-12 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-end gap-3 flex-wrap">
            <HiOutlineMail className="text-indigo-600 text-xl" />
            <span className="font-semibold">littlehope.ecommerce@gmail.com</span>
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <MdHelp className="text-indigo-600 text-xl" />
            <span className="font-semibold">help@littlehope.shop</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
            <FaPhoneAlt className="text-indigo-600 text-xl" />
            <span className="font-semibold">+91 8086154280</span>
          </div>
        </div>

        <hr className="hidden lg:block md:block border-gray-300 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-6">
          
          {/* Left - Copyright */}
          <p className="text-center md:text-left">
            © 2025 <span className="font-semibold text-gray-700">Little Hope Fashion Pvt. Ltd.</span>
          </p>
          
          {/* Center - Policies */}
          <div className="flex justify-center space-x-6 text-gray-600">
            <span className="underline cursor-pointer hover:text-indigo-600 transition">Terms & Conditions</span>
            <span className="underline cursor-pointer hover:text-indigo-600 transition">Privacy Policy</span>
          </div>
          
          {/* Right - Social Icons */}
          <div className="flex justify-center space-x-6 text-gray-600">
            <a href="https://www.facebook.com/share/1VTa5Hq5en/?mibextid=wwXIfr">
            <FaFacebookF className="cursor-pointer text-[#1877F2] transition text-lg" />
            </a>
             <a href="https://x.com/littlehopeeshop?s=11">
            <RxCross2 className="cursor-pointer text-gray-900 transition text-lg" />
            </a>
             <a href="https://www.instagram.com/little_hop_e?igsh=MXY2ZWViem42aDdtMQ==">
            <FaInstagram className="cursor-pointer text-[#E4405F] transition text-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}



          