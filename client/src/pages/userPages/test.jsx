// BottomNav.jsx
import { FaHome, FaThList, FaUser } from 'react-icons/fa';

const navItems = [
  { icon: <FaHome size={20} />, label: 'Home' },
  { icon: <FaThList size={20} />, label: 'Category' },
  { icon: <FaUser size={20} />, label: 'Profile' },
];

const BottomNav = () => (
  <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 sm:hidden z-50 w-[90%] max-w-md">
    <div className="flex justify-between items-center backdrop-blur-md bg-white/60 border border-white/30 rounded-2xl px-6 py-3 shadow-lg">
      {navItems.map(({ icon, label }) => (
        <button
          key={label}
          className="flex flex-col items-center text-gray-700 text-xs hover:text-black transition transform hover:scale-105"
        >
          {icon}
          <span className="mt-1">{label}</span>
        </button>
      ))}
    </div>
  </nav>
);

export default BottomNav;


// FabNav.jsx
import { FaHome, FaPlusCircle, FaUser } from 'react-icons/fa';

const BottomNav = () => (
  <nav className="fixed bottom-0 w-full bg-white border-t sm:hidden z-50">
    <div className="flex justify-around items-center py-3 relative">
      <FaHome size={20} className="text-gray-600" />
      <button className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition">
        <FaPlusCircle size={24} />
      </button>
      <FaUser size={20} className="text-gray-600" />
    </div>
  </nav>
);

export default BottomNav;


// SidebarStyleNav.jsx
import { FaHome, FaThList, FaUser } from 'react-icons/fa';

const items = [FaHome, FaThList, FaUser];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 w-full sm:hidden z-50">
    <div className="flex justify-evenly bg-white border-t py-3">
      {items.map((Icon, idx) => (
        <button key={idx} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-black">
          <Icon size={20} />
          <span className="hidden xs:inline text-sm">Menu {idx + 1}</span>
        </button>
      ))}
    </div>
  </nav>
);

export default BottomNav;


// MediaPlayerNav.jsx
import { FaHome, FaPlay, FaUser } from 'react-icons/fa';

const BottomNav = () => (
  <nav className="fixed bottom-0 w-full sm:hidden z-50 bg-white border-t px-4">
    <div className="flex justify-between items-center py-3 relative">
      <FaHome size={20} className="text-gray-600" />
      <button className="absolute left-1/2 -translate-x-1/2 -top-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition">
        <FaPlay size={22} />
      </button>
      <FaUser size={20} className="text-gray-600" />
    </div>
  </nav>
);

export default BottomNav;