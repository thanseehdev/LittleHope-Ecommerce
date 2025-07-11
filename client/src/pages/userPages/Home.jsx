
import CategoryScroller from "../../components/userCom/CategoryScoller";
import Footer from "../../components/userCom/common/Footer";
import Navbar from "../../components/userCom/common/Navbar";
import NewArrivals from "../../components/userCom/products/newArrivals";



function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryScroller />

      {/* Image Row */}
      <div className="flex flex-row w-full">
        <img 
          src="/comingSoon2-img.png" 
          alt="" 
          className="w-1/2 h-auto transition-transform duration-300 ease-in-out" 
        />
        <img 
          src="/betaVersion-img.png" 
          alt="" 
          className="w-1/2 h-auto transition-transform duration-300 ease-in-out " 
        />
      </div>

      <NewArrivals />
      <Footer />
    </div>
  );
}

export default Home;

