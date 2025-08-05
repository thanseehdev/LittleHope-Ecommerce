import React, { useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { newArrivals } from "../../../redux/features/user/product/newArrivalAction";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.newArrival);

  useEffect(() => {
    dispatch(newArrivals());
  }, [dispatch])

  const scroll = (direction) => {
    const scrollAmount = 300;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + direction * scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-10 px-6 bg-white">
      <h2 className="lg:text-3xl text-2xl font-semibold text-center text-gray-800 mb-8">New Arrivals</h2>
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          aria-label="Scroll left"
          onClick={() => scroll(-1)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition hidden md:block"
        >
          <FaArrowLeft size={18} />
        </button>

        <div
          ref={scrollRef}
          className="flex w-full overflow-x-auto hide-scrollbar space-x-6 py-4 px-1"
        >
          {products.map((item, index) => (

            <Link key={item.id} to={`/productDetails/${item._id}`}>
              <div
                className="relative  min-w-[220px] sm:min-w-[220px] lg:min-w-[240px] rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 active:scale-105 cursor-pointer"
              >
                <img
                  src={item.images[0]}
                  alt={item.category}
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
                 <div className="absolute bottom-3 left-3 flex items-center space-x-3 bg-white/30 backdrop-blur-md rounded-lg px-3 py-1 shadow-sm select-none max-w-[90%]">
              <p className="text-gray-900 font-semibold text-sm truncate">{item.category}</p>
              <span className="text-red-600 font-bold text-xs whitespace-nowrap">
                -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
              </span>
            </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          aria-label="Scroll right"
          onClick={() => scroll(1)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition hidden md:block"
        >
          <FaArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default LatestProducts;






