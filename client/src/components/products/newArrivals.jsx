import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const exclusiveItems = [
  {
    brand: "ASOS",
    offer: "UP TO 30% OFF",
    img: "/productsImg/newArrivals-img/new-img8.webp",
  },
  {
    brand: "SHEIN",
    offer: "UNDER ₹999",
    img: "/productsImg/newArrivals-img/new-img5.webp",
  },
  {
    brand: "yousta",
    offer: "UNDER ₹299",
    img: "/productsImg/newArrivals-img/new-img10.webp",
  },
  {
    brand: "FYRE ROSE",
    offer: "MIN. 60% OFF",
    img: "/productsImg/newArrivals-img/new-img2.webp",
  },
  {
    brand: "FYRE ROSE",
    offer: "MIN. 60% OFF",
    img: "/productsImg/newArrivals-img/new-img9.webp",
  },
  {
    brand: "FYRE ROSE",
    offer: "MIN. 60% OFF",
    img: "/productsImg/newArrivals-img/new-img1.webp",
  },
  {
    brand: "FYRE ROSE",
    offer: "MIN. 60% OFF",
    img: "/productsImg/newArrivals-img/new-img7.webp",
  },
];

const NewArrivals = () => {
  const scrollRef = useRef();
  
    const scroll = (direction) => {
      const scrollAmount = 300;
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + direction * scrollAmount,
        behavior: "smooth",
      });
    };

  return (
    <div className="py-10 px-6 bg-gray-50">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">New Arrivals</h2>
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
            {exclusiveItems.map((item, index) => (
              <div
                key={index}
                className="relative min-w-[200px] sm:min-w-[220px] lg:min-w-[240px] rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 active:scale-105"

              >
                <img
                  src={item.img}
                  alt={item.brand}
                  className="w-full h-72 object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-xs font-semibold shadow-md">
                  <p>{item.brand}</p>
                  <p className="text-gray-600">{item.offer}</p>
                </div>
              </div>
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

export default NewArrivals;






