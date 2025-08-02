
import { Link } from "react-router-dom";
import CategoryScroller from "../../components/userCom/CategoryScoller";
import BottomNav from "../../components/userCom/common/BottomNav";
import Footer from "../../components/userCom/common/Footer";
import Navbar from "../../components/userCom/common/Navbar";
import NewArrivals from "../../components/userCom/products/newArrivals";



function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryScroller />

      {/* Image Row */}
      <div className=" lg:w-full lg:mb-0 lg:mt-0 flex justify-center mt-2 mb-2">
        <img 
          src="/comingSoon4.png" 
          alt="" 
          className=" lg:h-[800px] lg:w-full border-none" 
          loading="lazy"
        />
      </div>

      <NewArrivals />
        <div className="bg-gray-200 border-none lg:flex">
  <div className="relative w-full lg:w-1/2 lg:h-[600px]">
    <img 
      src="/bannerOf2.avif" 
      alt="" 
      className="w-full h-full object-cover border-none" 
      loading="lazy"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <Link to="/allProducts">
      <button className="px-6 lg:text-sm text-xs py-3 text-white bg-white/30 backdrop-blur-sm rounded-md text-lg font-semibold hover:bg-white/40 transition">
        Shop Now
      </button>
      </Link>
    </div>
  </div>

  <div className="relative w-full lg:w-1/2 lg:h-[600px]">
    <img 
      src="/bannerOf3.avif" 
      alt="" 
      className="w-full h-full object-cover border-none" 
      loading="lazy"
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <Link to="/allProducts">
      <button className="px-6 lg:text-sm text-xs py-3 text-white bg-white/30 backdrop-blur-sm rounded-md text-lg font-semibold hover:bg-white/40 transition">
       Shop Now
      </button>
      </Link>
    </div>
  </div>
</div>


      <BottomNav/>
      <Footer />
    </div>
  );
}

export default Home;

