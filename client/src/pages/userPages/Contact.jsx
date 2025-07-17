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
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Contact Us</h1>
          <p className="text-center text-sm text-gray-500 mb-8">
            Reach out to us through any of the platforms below.
          </p>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ContactCard
              icon={<FaWhatsapp className="text-green-500 w-5 h-5" />}
              label="Chat on WhatsApp"
              href="https://wa.me/919999999999"
            />
            <ContactCard
              icon={<FaPhone className="text-blue-500 w-5 h-5" />}
              label="Call Us"
              href="tel:+919999999999"
            />
            <ContactCard
              icon={<FaEnvelope className="text-yellow-500 w-5 h-5" />}
              label="Email Support"
              href="mailto:support@littlehope.com"
            />
            <ContactCard
              icon={<FaInstagram className="text-pink-500 w-5 h-5" />}
              label="Instagram"
              href="https://www.instagram.com/little_hop_e?igsh=MXY2ZWViem42aDdtMQ=="
            />
            <ContactCard
              icon={<FaFacebook className="text-blue-600 w-5 h-5" />}
              label="Facebook"
              href="https://facebook.com/littlehope"
            />
            <ContactCard
              icon={<FaTwitter className="text-sky-500 w-5 h-5" />}
              label="Twitter"
              href="https://twitter.com/littlehope"
            />
          </div>

          <p className="text-center text-xs text-gray-400 mt-10">
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
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-100 transition-all"
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="text-gray-800 font-medium">{label}</span>
    </a>
  );
}



