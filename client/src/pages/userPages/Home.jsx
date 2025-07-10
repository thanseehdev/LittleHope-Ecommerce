
import CategoryScroller from "../../components/userCom/CategoryScoller";
import Footer from "../../components/userCom/common/Footer";
import Navbar from "../../components/userCom/common/Navbar";
import NewArrivals from "../../components/userCom/products/newArrivals";



function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryScroller />
      <img 
  src="/comingSoon2.png" 
  alt="" 
  className="   lg:h-1/3 lg:w-1/2 transition-transform duration-300 ease-in-out group-hover:scale-110" 
/>

      <NewArrivals />
      <Footer />
    </div>
  );

}

export default Home;
