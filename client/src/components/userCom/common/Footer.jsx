import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdHelp } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export default function Footer() {
  return (
    <footer className="bg-white text-sm text-gray-700 border-t ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
            <FaPhoneAlt className="text-lg" />
            <span>Talk to us: +91 8086154280</span>
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <MdHelp className="text-lg" />
            <span>Helpcentre: help@littlehope.shop</span>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-3 flex-wrap">
            <HiOutlineMail className="text-lg" />
            <span>Email: littlehope@gmail.com</span>
          </div>
        </div>

        <div className="border-t pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3">
          <p className="text-center md:text-left">
            © 2025 Retail World Limited.{" "}
            <span className="underline cursor-pointer">Terms & Conditions</span> -{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>
          </p>
          <div className="flex justify-center space-x-4">
            <FaFacebookF className="text-base cursor-pointer text-[#1877F2]" /> {/* Facebook Blue */}
  <RxCross2 className="text-base text-bold cursor-pointer text-gray-900" /> {/* Neutral or custom color */}
  <FaInstagram className="text-base cursor-pointer text-[#E4405F]" /> {/* Instagram Pinkish Red */}
          </div>
        </div>
      </div>
    </footer>
  );
}



          