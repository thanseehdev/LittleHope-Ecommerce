import React, { useEffect, useState } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { getWishItem, removeWishItem } from "../../redux/features/user/wishlist/wishlistAction";
import { addToCart, getCartItems } from "../../redux/features/user/cart/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearMessages } from "../../redux/features/user/message";

import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid"

export default function WishlistCard() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { items, error, loading } = useSelector((state) => state.wishlist);
  const { message, error: err } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getWishItem());
  }, [dispatch]);

  const handleRemove = async (ProductId) => {
    await dispatch(removeWishItem(ProductId));
    dispatch(getWishItem());
  };

  const handleMoveToBag = (product) => {
    setSelectedProduct(product);
    setShowSizeModal(true);
  };

  const handleAddToBag = (productId, size) => {
    console.log("Add to bag:", productId, "Size:", size);
    dispatch(addToCart({ productId: productId, quantity: 1, size: size }));
    setShowSizeModal(false);
    setSelectedSize(null);
  };

  useEffect(() => {
  if (message || err) {
    dispatch(getCartItems());

    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, 1500);

    // Cleanup timeout on dependency change or unmount
    return () => clearTimeout(timer);
  }
  // If no message or err, no side effect or cleanup needed
}, [message, err, dispatch]);


  return (
    <>
      <Navbar />
      {(message || err) && (
        <div
          className="fixed z-50 w-[92%] max-w-sm px-4 py-2 rounded-full text-sm font-semibold shadow-md
      flex items-center justify-between left-1/2 -translate-x-1/2
      bottom-4 sm:top-6 sm:bottom-auto bg-[#2e3142] text-white"
          role="alert"
        >
          <span className="flex items-center gap-2">
            {err ? (
              <ExclamationCircleIcon className="h-5 w-5 text-pink-500" />
            ) : (
              <CheckCircleIcon className="h-5 w-5 text-pink-500" />
            )}
            {message || (typeof err === 'string' ? err : 'An error occurred')}
          </span>

          <button
            onClick={() => dispatch(clearMessages())}
            className="text-pink-500 hover:text-pink-400 transition ml-2"
            aria-label="Close alert"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="bg-white min-h-screen px-4 pt-4 md:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="lg:text-xl text-lg font-semibold">Wishlist</h2>
          <span className="text-gray-500 lg:text-sm text-xs">{items?.length || 0} items</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button className="bg-gray-100 text-sm px-4 py-2 rounded-full font-medium">
            Collections
          </button>
          {["All", "Trousers", "Jackets"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm border ${activeTab === tab ? "border-pink-500 text-pink-500" : "text-gray-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading / Error */}
        {loading && <p>Loading wishlist...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Wishlist Grid or Empty State */}
        {items && items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {items.map((item) => {
              const product = item.product;
              return (
                <div key={item._id} className=" border rounded  p-3 relative">
                  <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                    <XMarkIcon
                      onClick={() => handleRemove(product._id)}
                      className="h-4 w-4 text-gray-500"
                    />
                  </button>
                  <Link key={product.id} to={`/productDetails/${product._id}`}>
                    <img
                      src={product?.images?.[0] || "/default-product.jpg"}
                      alt={product?.name || "Product"}
                      className="w-full h-40 lg:h-[250px] lg:w-[250px] rounded-md object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <div className="mt-2">
                    <h3 className=" text-sm mt-1">{product?.name}</h3>
                    <div className="text-sm text-gray-700 mt-1">
                      <span className="font-bold text-black">
                        ₹{product?.discountPrice || product?.price}
                      </span>{" "}
                      {product?.discountPrice && product?.price && (
                        <span className="line-through text-gray-400">₹{product.price}</span>
                      )}
                      <span className="text-green-600 text-xs ml-1">
                        {Math.round(
                          ((product.price - product.discountPrice) / product.price) * 100
                        )}
                        %OFF
                      </span>
                    </div>
                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="mt-2 w-full bg-pink-600 hover:bg-pink-700 text-white text-sm py-2 rounded"
                    >
                      MOVE TO BAG
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border-none ">
            <img
              src="/emptyWishTSP.png"
              alt="Empty Wishlist"
              className=" object-contain lg:h-[500px]"
            />

          </div>
        )}

        {/* Size Modal */}
        {showSizeModal && selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end md:items-center justify-center px-4">
            <div className="bg-white w-full md:w-[400px] rounded-t-lg md:rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Select Size</h3>
                <button onClick={() => setShowSizeModal(false)} className="text-gray-500">
                  &times;
                </button>
              </div>
              <div className="flex gap-1 justify-center mb-6">
                {selectedProduct.sizeAndStock.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    className={`relative border rounded text-center text-sm font-medium h-8 w-20
        ${selectedSize === s.size ? "bg-pink-600 text-white" : "bg-gray-200 text-black"}
        ${s.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {s.size}
                    {s.stock === 0 && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-red-600 bg-white bg-opacity-80">
                        Out
                      </span>
                    )}
                  </button>
                ))}
              </div>


              <button
                onClick={() => handleAddToBag(selectedProduct._id, selectedSize)}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
              >
                DONE
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}




