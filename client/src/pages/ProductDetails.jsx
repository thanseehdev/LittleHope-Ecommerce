import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer"

const sizes = ["28", "30", "32", "34"];
const images = ["a", "b", "c", "d", "e"];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState("a");

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Image Gallery */}
         <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4">
  {/* Thumbnail list */}
  <div className="flex flex-row lg:flex-col gap-2 overflow-auto max-lg:justify-center">
    {images.map((i) => (
      <img
        key={i}
        onClick={() => setSelectedImage(i)}
        src={`/productsImg/productDetails-img/product-7${i}-img.jpg`}
        alt={`Product thumbnail ${i}`}
        className={`w-16 h-20 rounded border cursor-pointer ${
          selectedImage === i ? "border-pink-400 border-1 " : ""
        }`}
      />
    ))}
  </div>

  {/* Main image */}
  <div className="flex-1">
    <img
      src={`/productsImg/productDetails-img/product-7${selectedImage}-img.jpg`}
      alt="Main Product"
      className="rounded-lg w-full object-cover"
    />
  </div>
</div>


          {/* Right - Product Info */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h2 className="text-2xl font-semibold">
              Men Straight Fit Mid Rise Black Jeans
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold text-lg">₹389</span>
              <span className="line-through text-gray-500">₹1,999</span>
              <span className="text-green-500 font-medium">80% off</span>
            </div>
            <p className="text-sm text-gray-600">
              456 ratings and 17 reviews
            </p>

            <div>
              <p className="font-medium mb-2">Color:</p>
              <div className="flex gap-2">
                <img
                  src="https://via.placeholder.com/60x80"
                  className="w-14 h-16 border rounded cursor-pointer"
                />
                <img
                  src="https://via.placeholder.com/60x80"
                  className="w-14 h-16 border rounded cursor-pointer"
                />
              </div>
            </div>

            <div>
              <p className="font-medium mb-2 mt-4">Size:</p>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-1 border rounded hover:bg-gray-100"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">
                Add to Cart
              </button>
              <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                Buy Now
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>Available offers:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>5% cashback on Flipkart Axis Bank Credit Card</li>
                <li>10% off on BOB EMI Transactions</li>
                <li>
                  10% off up to ₹1,250 on IDFC FIRST Bank Credit EMI
                </li>
                <li>Extra 20% off (inclusive of cashback/coupon)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

