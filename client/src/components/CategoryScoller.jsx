import React from "react";

const categories = [
  { label: "Kids", img: "CategoryImg/categoryScroller-img3.webp" },
  { label: "Girls", img: "/CategoryImg/categoryScroller-img1.webp" },
  { label: "Boys", img: "CategoryImg/categoryScroller-img2.webp" },
   { label: "Accessories", img: "CategoryImg/categoryScroller-img8.webp" },
  { label: "Baby Care", img: "CategoryImg/categoryScroller-img6.webp" },
   { label: "Nutrition", img: "CategoryImg/categoryScroller-img7.webp" },
    { label: "Soft Toys", img: "CategoryImg/categoryScroller-img9.webp" },

];

export default function CategoryScroller() {
  return (
    <div className="w-full bg-white border-b border-gray-200 py-4 overflow-x-auto hide-scrollbar sm:border-b-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-6 px-4 w-max lg:w-full lg:justify-center">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-xs text-gray-700"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-20 h-20 object-cover rounded shadow "
              />
              <span className="mt-1">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
