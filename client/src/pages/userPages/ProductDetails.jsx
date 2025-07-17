import React, { useEffect, useState } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetail } from "../../redux/features/user/product/productDetailAction";
import { addToCart } from "../../redux/features/user/cart/cartAction";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addToWishlist } from "../../redux/features/user/wishlist/wishlistAction";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { product, loading, error } = useSelector((state) => state.productDetail);
  const cartState = useSelector((state) => state.cart);

  useEffect(() => {
    if (id) {
      dispatch(productDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1, size: selectedSize }));
  };

  const handleWishlistToggle = () => {
    setIsWishlisted((prev) => !prev);
    dispatch(addToWishlist({ ProductId: id }));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!product) return null;

  const discountPercentage = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4 lg:sticky lg:top-24">
            {/* Thumbnails */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-auto max-lg:justify-center">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`w-16 h-20 rounded border cursor-pointer object-cover ${
                    selectedImage === img ? "border-pink-400" : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1">
              <img
                src={selectedImage || "/comingSoon2.png"}
                alt="Main Product"
                className="rounded-lg w-full h-[450px] lg:h-[600px] object-cover"
              />
              <button
                onClick={handleWishlistToggle}
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
          <div className="w-full lg:w-1/2 ">
            <h2 className="text-2xl font-semibold">{product.name}</h2>

            <div className="flex items-center gap-3">
              <span className="text-green-600 font-semibold text-xl">₹{product.discountPrice}</span>
              <span className="line-through text-gray-500">₹{product.price}</span>
              <span className="text-green-500 font-medium">{discountPercentage}% off</span>
            </div>

            <p className="text-sm text-gray-600">{product.category}</p>

            {/* Size Selector */}
            <div>
              <p className="font-medium mt-3 mb-2">Select Size:</p>
              <div className="flex flex-wrap gap-3">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[60px] text-sm sm:text-base px-4 py-2 border rounded-md transition ${
                      selectedSize === size
                        ? "bg-gray-200  border-gray"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || cartState.status === "loading"}
                className={`flex-1 px-6 py-3 rounded text-white font-medium transition ${
                  !selectedSize || cartState.status === "loading"
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {cartState.status === "loading" ? "Adding..." : "Add to Cart"}
              </button>

              <button className="flex-1 bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 font-medium">
                Buy Now
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-4 text-sm text-gray-700">
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
      </div>
    </>
  );
}




