import React, { useEffect, useState } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetail } from "../../redux/features/user/product/productDetailAction";
import { addToCart } from "../../redux/features/user/cart/cartAction";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  addToWishlist,
  getWishItem,
} from "../../redux/features/user/wishlist/wishlistAction";
import { Link } from "react-router-dom";
import {
  clearMessage as clearCartMessage,
} from "../../redux/features/user/cart/cartSlice";
import {
  clearMessage as clearWishlistMessage,
} from "../../redux/features/user/wishlist/wishlistSlice";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [showComingSoonMessage, setShowComingSoonMessage] = useState(false);

  const { product, similarProducts = [], loading, error } = useSelector(
    (state) => state.productDetail
  );
  const wishState = useSelector((state) => state.wishlist);
  const cartState = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
      dispatch(productDetail(id));
      dispatch(getWishItem());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (wishState.items && product?._id) {
      const found = wishState.items.some(
        (item) =>
          item.product === product._id || item.product?._id === product._id
      );
      setIsWishlisted(found);
    }
  }, [wishState.items, product]);

  useEffect(() => {
    if (cartState.message || cartState.error) {
      const timer = setTimeout(() => dispatch(clearCartMessage()), 1500);
      return () => clearTimeout(timer);
    }
  }, [cartState.message, cartState.error, dispatch]);

  useEffect(() => {
    if (wishState.message || wishState.error) {
      const timer = setTimeout(() => dispatch(clearWishlistMessage()), 1500);
      return () => clearTimeout(timer);
    }
  }, [wishState.message, wishState.error, dispatch]);

 const handleAddToCart = () => {
    const selectedVariant = product.sizeAndStock.find(
      (item) => item.size === selectedSize
    );
    if (!selectedVariant || selectedVariant.stock === 0) {
      return;
    }

    dispatch(
      addToCart({ productId: product._id, quantity: 1, size: selectedSize })
    );
  };

  const handleBuyNow = () => {
    if (selectedSize) {
      setShowComingSoonMessage(true);

      // Optional: Hide the message after a few seconds
      setTimeout(() => {
        setShowComingSoonMessage(false);
      }, 4000);
    }
  };


  const handleWishlistToggle = () => {
    dispatch(addToWishlist({ ProductId: id }));
    setIsWishlisted(true);
  };

  if (loading) return <p className="p-8 text-gray-600">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;
  if (!product) return <div className="text-center py-10 text-gray-500">Product not found.</div>;

  const discountPercentage = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

  return (
    <>
      <Navbar />

      {(cartState.message ||
        cartState.error ||
        wishState.message ||
        wishState.error) && (
          <div
            className="fixed z-50 w-[92%] max-w-sm px-4 py-2 rounded-full text-sm font-semibold shadow-md
          flex items-center justify-between left-1/2 -translate-x-1/2
          bottom-4 sm:top-6 sm:bottom-auto bg-[#2e3142] text-white"
            role="alert"
          >
            <span className="flex items-center gap-2">
              {(cartState.error || wishState.error) ? (
                <ExclamationCircleIcon className="h-5 w-5 text-pink-500" />
              ) : (
                <CheckCircleIcon className="h-5 w-5 text-pink-500" />
              )}
              {cartState.message || cartState.error || wishState.message || wishState.error}
            </span>

            <button
              onClick={() => {
                dispatch(clearCartMessage());
                dispatch(clearWishlistMessage());
              }}
              className="text-pink-500 hover:text-pink-400 transition ml-2"
              aria-label="Close alert"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4 lg:sticky lg:top-24">
            <div className="flex flex-row lg:flex-col gap-2 overflow-auto max-lg:justify-center">
              {product.images?.map((img, idx) => (
                <div
  key={idx}
  onClick={() => setSelectedImage(img)}
  className={`flex-shrink-0 w-[64px] h-[64px] rounded-full overflow-hidden border cursor-pointer mt-3 ${
    selectedImage === img ? "border-pink-500" : "border-gray-300"
  }`}
>
  <img
    src={img}
    alt={`Product thumbnail ${idx + 1}`}
    className="w-full h-full object-cover block"
/>
</div>

              ))}
            </div>

            <div className="relative flex-1">
              <img
                src={selectedImage || "/comingSoon2.png"}
                alt="Main Product"
                className="rounded-sm w-full h-[450px] lg:h-[600px] object-cover"
              />
              <button
                onClick={handleWishlistToggle}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-md hover:bg-pink-100 transition"
              >
                {isWishlisted ? (
                  <AiFillHeart className="text-pink-500 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-gray-500 text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2">
           <h2 className="lg:text-2xl text-xl font-medium text-gray-900 mb-2">{product.name}</h2>

<div className="flex items-center space-x-3 mb-2">
  <span className="text-lg font-semibold text-green-600">
    ₹{product.discountPrice}
  </span>
  <span className="text-sm text-gray-400 line-through">
    ₹{product.price}
  </span>
  <span className="text-xs font-semibold text-white bg-green-600 rounded px-2 py-0.5">
    {discountPercentage}% OFF
  </span>
</div>

<p className="text-xs text-gray-500 uppercase">{product.category}</p>



               {/* Size Selector */}
            <div>
              <p className="font-medium mt-3 mb-2">Select Size:</p>
             <div className="flex justify-start sm:justify-center md:justify-start flex-wrap gap-3.5">

  {product.sizeAndStock?.map(({ size, stock }) => (
    <button
      key={size}
      onClick={() => setSelectedSize(size)}
      disabled={stock === 0}
      className={`relative min-w-[60px] text-sm sm:text-base px-2 py-2 border rounded-md transition
        ${selectedSize === size
          ? "bg-gray-200 border-gray"
          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}
        ${stock === 0 ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {size}
      {stock === 0 && (
        <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-bold text-red-600 bg-white bg-opacity-80">
          Stock Out
        </span>
      )}
    </button>
  ))}
</div>

              {!selectedSize && (
                <p className="text-sm text-red-500 mt-1">Please select a size.</p>
              )}
            </div>


            {showComingSoonMessage && (
              <div className="mt-6 p-5 border-l-4 border-blue-500 bg-blue-50 rounded-md shadow-sm relative">
                <div className="absolute inset-0 pointer-events-none rounded-md" />
                <div className="relative z-10">
                  <h3 className="text-base font-semibold text-blue-700 flex items-center mb-1">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12" y2="8" />
                    </svg>
                    Coming Soon
                  </h3>
                  <p className="text-sm text-blue-800">
                    This feature is currently <span className="font-medium text-blue-700">under development</span>. In the meantime, please use the <span className="italic underline font-bold text-blue-800">Add to Cart</span> option.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || cartState.status === "loading"}
                className={`flex-1 px-6 py-3 rounded text-white font-medium transition ${!selectedSize || cartState.status === "loading"
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                  }`}
              >
                {cartState.status === "loading" ? "Adding..." : "Add to Cart"}
              </button>



              <button
                onClick={handleBuyNow}
                disabled={!selectedSize}
                className={`flex-1 px-6 py-3 rounded text-white font-medium transition ${!selectedSize
                    ? 'bg-red-300 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600'
                  }`}
              >
                Buy Now
              </button>

            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-4 lg:text-base text-sm text-gray-700">
                <p className="font-medium mb-1">Description:</p>
                <p className="leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Offers */}
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-medium">Available offers:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>5% cashback on Axis Bank Credit Card</li>
                <li>10% off on BOB EMI Transactions</li>
                <li>10% off up to ₹1,250 on IDFC FIRST Bank Credit EMI</li>
                <li>Extra 20% off (inclusive of cashback/coupon)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              Explore more like this
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {similarProducts.map((item) => {
                const discount = Math.round(
                  ((item.price - item.discountPrice) / item.price) * 100
                );
                return (
                  <div
                    key={item._id}
                    className="border rounded-sm overflow-hidden hover:shadow-lg transition"
                  >
                    <Link to={`/productDetails/${item._id}`}>
                      <img
                        src={item.images?.[0] || "/placeholder.jpg"}
                        alt={item.name}
                        className="w-full lg:object-fill lg:h-[280px] lg:w-1/1 h-44"
                      />
                      <div className="p-2">
                        <h4 className="lg:text-base font-semibold text-sm line-clamp-2">{item.name}</h4>
                        <div className="flex items-center gap-1">
                          <span className="text-green-600 lg:text-base text-sm">
                            ₹{item.discountPrice}
                          </span>
                          
                          <span className="line-through text-sm text-gray-500">
                            ₹{item.price}
                          </span>
                          <span className="text-green-500 text-sm">
                            {discount}% off
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}





