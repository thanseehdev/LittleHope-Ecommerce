import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { FaThreads } from "react-icons/fa6";
import Navbar from "../../components/userCom/common/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center px-1 py-7">
        <div className="w-full max-w-4xl  p-6 sm:p-10">
          <h1 className="lg:text-3xl text-2xl font-bold text-center text-gray-800 mb-2">Contact Us</h1>
          <p className="text-center text-sm text-gray-500 mb-8">
            Reach out to us through any of the platforms below.
          </p>

          {/* Responsive Grid */}
          <div className="grid bg-whit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ContactCard
              icon={<FaWhatsapp className="text-green-500 w-5 h-5" />}
              label="Chat on WhatsApp"
              href="https://chat.whatsapp.com/FUgVekMkn2v15G4nH2LNdG?mode=ac_t"
            />
            <ContactCard
              icon={<FaFacebook className="text-blue-600 w-5 h-5" />}
              label="Facebook"
              href="https://www.facebook.com/share/1VTa5Hq5en/?mibextid=wwXIfr"
            />
            <ContactCard
              icon={<FaInstagram className="text-pink-500 w-5 h-5" />}
              label="Instagram"
              href="https://www.instagram.com/little_hop_e?igsh=MXY2ZWViem42aDdtMQ=="
            />
            <ContactCard
              icon={<FcGoogle className="w-5 h-5" />}
              label="Gmail Support"
              href="mailto:littlehope.ecommerce@gmail.com"
            />
            <ContactCard
              icon={<FaThreads className="text-black w-5 h-5" />}
              label="Threads"
              href="https://www.threads.com/@little_hop_e?invite=0"
            />

            <ContactCard
              icon={<FaTwitter className="text-sky-500 w-5 h-5" />}
              label="Twitter"
              href="https://x.com/littlehopeeshop?s=11"
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
      className="flex items-center gap-4 p-4 bg-white rounded border border-b-4 border-gray-200 hover:border-b-pink-500 active:border-pink-500 focus:bg-pink-500 transition-300"
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="text-gray-800 font-medium">{label}</span>
    </a>
  );
}




