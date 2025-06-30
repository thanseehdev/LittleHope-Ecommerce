import React from "react";
import Navbar from "../components/common/Navbar";

const cartItems = [
  {
    id: 1,
    title: "THE BEAR HOUSE",
    subtitle: "Checked Spread Collar Relaxed Fit Pure Cotton Casual Shirt",
    price: 1175,
    originalPrice: 2799,
    discount: "58%",
    size: "38",
    qty: 1,
    image: "/productsImg/allProducts-img/product-9a-img.jpg", // Replace with real image paths
  },
  {
    id: 2,
    title: "HERE&NOW",
    subtitle: "Slim Fit Tartan Checked Casual Shirt",
    price: 755,
    originalPrice: 2099,
    discount: "64%",
    size: "42",
    qty: 1,
    image: "/productsImg/allProducts-img/productF-5b-img.jpg",
  },
];

export default function CartPage() {
  const totalMRP = 4898;
  const discount = 2968;
  const platformFee = 20;
  const totalAmount = totalMRP - discount + platformFee;

  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Items */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">2/2 ITEMS SELECTED</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row bg-white p-4 rounded-md shadow">
              <img src={item.image} alt={item.title} className="w-28 h-36 object-cover rounded-md" />
              <div className="flex-1 md:ml-4 mt-4 md:mt-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                    <div className="text-sm mt-2">
                      <span>Size: {item.size}</span> &nbsp;|&nbsp; <span>Qty: {item.qty}</span>
                    </div>
                  </div>
                  <button className="text-red-500 text-sm">Remove</button>
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-lg">₹{item.price}</span>
                  <span className="text-gray-400 ml-2 line-through text-sm">₹{item.originalPrice}</span>
                  <span className="text-green-600 ml-2 text-sm">{item.discount} OFF</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">7 days return available</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Price Details */}
        <div className="bg-white p-6 rounded-md shadow h-fit">
          <h3 className="font-semibold mb-4">PRICE DETAILS (2 Items)</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{totalMRP}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount on MRP</span>
              <span>-₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Coupon Discount</span>
              <span className="text-pink-600 cursor-pointer">Apply Coupon</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
          <button className="mt-6 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
