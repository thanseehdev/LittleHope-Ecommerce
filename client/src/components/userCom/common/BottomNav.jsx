// FabNav.jsx
import { FaHome, FaUser } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const BottomNav = () => (
  <nav className="fixed bottom-0 w-full backdrop-blur-md bg-white/60 border border-white/30  border-t sm:hidden md:hiden z-50">
    <div className="flex justify-around items-center py-3 relative ">
      <Link to='/'>
        <AiFillHome size={20} className="text-gray-600 hover:text-blue-500 active:text-blue-500 focus:text-blue-500"/>
      </Link>
   <Link to='/allProducts'>
  <div className="relative w-full flex justify-center">
    <button className="absolute  -top-10 transform  bg-black animate-spin-border rounded-full shadow hover:bg-blue-500 transition w-11 h-11 flex items-center justify-center">
      <img
        src="/LittleHope-Official-Logo2.png"
        alt="hanger icon"
        className="w-full h-full object-contain"
        loading="lazy"
      />
      
    </button>
  </div>
</Link>


      <Link to='/account'>
   
        <FaUser size={17} className="text-gray-600 hover:text-blue-500 active:text-blue-500 focus:text-blue-500" />
    
      </Link>
    </div>
  </nav>
);

export default BottomNav;






