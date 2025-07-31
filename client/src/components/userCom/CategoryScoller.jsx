import React from "react";
import { Link } from "react-router-dom";
const categories = [
  { label: "Kids", img: "CategoryImg/categoryScroller-img3.webp", path: "/allProducts" },
  { label: "Girls", img: "/CategoryImg/categoryScroller-img1.webp", path: "/allProducts" },
  { label: "Boys", img: "CategoryImg/categoryScroller-img2.webp", path: "/allProducts" },
  { label: "Accessories", img: "CategoryImg/categoryScroller-img8.webp", path: "/comingSoon" },
  { label: "Baby Care", img: "CategoryImg/categoryScroller-img6.webp", path: "/comingSoon" },
  { label: "Nutrition", img: "CategoryImg/categoryScroller-img7.webp", path: "/comingSoon" },
  { label: "Soft Toys", img: "CategoryImg/categoryScroller-img9.webp", path: "/comingSoon" },
];


export default function CategoryScroller() {
  return (
    <div className="flex w-full bg-white border-b border-gray-200 py-4 overflow-x-auto hide-scrollbar sm:border-b-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex md:gap-9  lg:gap-9 gap-6 px-4 w-max lg:w-full md:justify-center lg:justify-center">
          {categories.map((cat, index) => (
  <Link
    to={cat.path}
    key={index}
    className="flex flex-col items-center  lg:text-sm text-xs text-gray-700 hover:text-pink-500 transition"
  >
    <img
      src={cat.img}
      alt={cat.label}
      className="lg:w-[100px] lg:h-[100px] w-20 h-20 object-cover rounded shadow"
    />
    <span className=" mt-1">{cat.label}</span>
  </Link>
))}

        </div>
      </div>
    </div>
  );
}
