import React, { useState } from "react";
import Navbar from "../../components/userCom/common/Navbar";

const initialWishlistItems = [
  {
    id: 1,
    title: "Blackberrys",
    price: 1871,
    originalPrice: 2599,
    discount: 28,
    image: "/productsImg/allProducts-img/productF-7a-img.jpg",
  },
  {
    id: 2,
    title: "Roadster",
    price: 599,
    originalPrice: 1499,
    discount: 60,
    image: "/productsImg/allProducts-img/productF-1a-img.jpg",
  },
];

export default function WishlistCard() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const moveToBag = (item) => {
    console.log(`Moved ${item.title} to bag!`); // Here, you'd add it to the cart in a real app
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-lg font-semibold mb-4">My Wishlist ({wishlistItems.length} items)</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">

          {wishlistItems.map((item) => (
            <div key={item.id} className="border rounded-md shadow-sm p-4 w-full max-w-xs">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full w-7 h-7 flex items-center justify-center text-gray-600 text-sm"
                >
                  ✕
                </button>
              </div>
              <div className="mt-2">
                <p className="font-medium text-sm">{item.title}</p>
                <div className="text-sm mt-1">
                  <span className="font-bold text-black">₹{item.price}</span>{" "}
                  <span className="line-through text-gray-500 text-xs">₹{item.originalPrice}</span>{" "}
                  <span className="text-red-500 text-xs">({item.discount}% OFF)</span>
                </div>
                <button
                  onClick={() => moveToBag(item)}
                  className="text-pink-600 font-semibold text-sm mt-2"
                >
                  MOVE TO BAG
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

