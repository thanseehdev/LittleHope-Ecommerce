
import CategoryScroller from "../components/CategoryScoller";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import NewArrivals from "../components/products/newArrivals";



function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryScroller />
      <img src="/comingSoon2.png" alt="" className=" w-1/1 h-1/2 transition-transform duration-300 ease-in-out group-hover:scale-110" />
      <NewArrivals />
      <Footer />
    </div>
  );

}

export default Home;
