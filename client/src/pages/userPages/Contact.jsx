import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

import Navbar from "../../components/userCom/common/Navbar";

export default function ContactPage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white border border-gray-200 shadow-sm rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* WhatsApp */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all p-4 rounded-md"
          >
            <FaWhatsapp className="text-green-600 w-5 h-5" />
            <span className="text-gray-800 font-medium">Chat on WhatsApp</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+919999999999"
            className="flex items-center gap-4 bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all p-4 rounded-md"
          >
            <FaPhone className="text-blue-600 w-5 h-5" />
            <span className="text-gray-800 font-medium">Call Us</span>
          </a>

          {/* Email */}
          <a
            href="mailto:support@littlehope.com"
            className="flex items-center gap-4 bg-white border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition-all p-4 rounded-md"
          >
            <FaEnvelope className="text-yellow-600 w-5 h-5" />
            <span className="text-gray-800 font-medium">Email Support</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/little_hop_e?igsh=MXY2ZWViem42aDdtMQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white border border-gray-200 hover:border-pink-500 hover:bg-pink-50 transition-all p-4 rounded-md"
          >
            <FaInstagram className="text-pink-600 w-5 h-5" />
            <span className="text-gray-800 font-medium">Instagram</span>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/littlehope"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white border border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all p-4 rounded-md"
          >
            <FaFacebook className="text-blue-700 w-5 h-5" />
            <span className="text-gray-800 font-medium">Facebook</span>
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com/littlehope"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white border border-gray-200 hover:border-sky-500 hover:bg-sky-50 transition-all p-4 rounded-md"
          >
            <FaTwitter className="text-sky-600 w-5 h-5" />
            <span className="text-gray-800 font-medium">Twitter</span>
          </a>
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          We typically respond within 1–2 business days.
        </p>
      </div>
    </div>
    </>
  );
}

