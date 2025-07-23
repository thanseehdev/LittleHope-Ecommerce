import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import { SiTelegram, SiGmail } from "react-icons/si";  // Added SiTelegram and SiGmail icons
import Navbar from "../../components/userCom/common/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center px-1 py-7">
        <div className="w-full max-w-4xl  p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Contact Us</h1>
          <p className="text-center text-sm text-gray-500 mb-8">
            Reach out to us through any of the platforms below.
          </p>

          {/* Responsive Grid */}
          <div className="grid bg-whit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactCard 
              icon={<FaWhatsapp className="text-green-500 w-5 h-5" />}
              label="Chat on WhatsApp"
              href="https://wa.me/8086154280"
            />
            <ContactCard
              icon={<FaFacebook className="text-blue-600 w-5 h-5" />}
              label="Facebook"
              href="https://facebook.com/littlehope"
            />
            <ContactCard
              icon={<FaInstagram className="text-pink-500 w-5 h-5" />}
              label="Instagram"
              href="https://www.instagram.com/little_hop_e?igsh=MXY2ZWViem42aDdtMQ=="
            />
            <ContactCard
              icon={<SiGmail className="text-red-600 w-5 h-5" />}  // Gmail icon
              label="Gmail Support"
              href="mailto:support@littlehope.com"
            />
            <ContactCard
              icon={<SiTelegram className="text-blue-400 w-5 h-5" />}  // Telegram icon
              label="Telegram"
              href="https://t.me/littlehope"  // Replace with your actual Telegram link
            />
            <ContactCard
              icon={<FaTwitter className="text-sky-500 w-5 h-5" />}
              label="Twitter"
              href="https://twitter.com/littlehope"
            />
          </div>

          <p className="text-center text-xs text-gray-700 mt-10">
            We typically respond within 1–2 business days.
          </p>
        </div>
      </div>
    </>
  );
}

// Reusable Contact Card
function ContactCard({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-white rounded border border-b-4 hover:border-b-pink-500 transition-300"
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="text-gray-800 font-medium">{label}</span>
    </a>
  );
}




