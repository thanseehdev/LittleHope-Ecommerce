
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
          className=" lg:h-auto lg:w-full h-[240px] rounded w-[370px] transition-transform duration-300 ease-in-out" 
        />
      </div>

      <NewArrivals />
      <BottomNav/>
      <Footer />
    </div>
  );
}

export default Home;

