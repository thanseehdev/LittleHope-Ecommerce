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
  const [selectedSize, setSelectedSize] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { product, loading, error } = useSelector((state) => state.productDetail);
  const cartState = useSelector((state) => state.cart);

  const [selectedImage, setSelectedImage] = useState("");

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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!product) return null;

  const discountPercentage = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );
  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1, size: selectedSize }));
  };
  const handleWishlistToggle = () => {
  setIsWishlisted((prev) => !prev);
  dispatch(addToWishlist({ProductId:id}))
};


  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnail list */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-auto max-lg:justify-center">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`w-16 h-20 rounded border cursor-pointer ${selectedImage === img ? "border-pink-400" : ""
                    }`}
                />
              ))}
            </div>

            {/* Main image */}
          {/* Main image */}
<div className="relative flex-1">
  <img
    src={selectedImage || "/comingSoon2.png"}
    alt="Main Product"
    className="rounded-lg w-full h-[450px] lg:h-[600px] object-cover"
  />

  <button
    onClick={handleWishlistToggle}
    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-pink-100 transition"
  >
    {isWishlisted ? (
      <AiFillHeart className="text-pink-500 text-xl" />
    ) : (
      <AiOutlineHeart className="text-gray-500 text-xl" />
    )}
  </button>
</div>

          </div>

          {/* Right - Product Info */}
          <div className="w-full lg:w-1/2 space-y-4">
            <h2 className="text-2xl font-semibold">{product.name}</h2>

            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold text-lg">
                ₹{product.discountPrice}
              </span>
              <span className="line-through text-gray-500">₹{product.price}</span>
              <span className="text-green-500 font-medium">{discountPercentage}% off</span>
            </div>

            <p className="text-sm text-gray-600">
              {/* You can show ratings/reviews here if available */}
              {product.category}
            </p>

            <div>
              <p className="font-medium mb-2 mt-4">Select Size:</p>
              <div className="flex flex-wrap gap-3 rounded">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-[30%] sm:w-auto px-4 py-1 border rounded hover:bg-gray-100 ${selectedSize === size ? "bg-gray-200 border-black" : ""
                      }`}
                  >
                    {size}
                  </button>
                ))}

              </div>
            </div>


            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || cartState.status === "loading"}
                className={`px-6 py-2 rounded text-white ${!selectedSize || cartState.status === "loading"
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                  }`}
              >
                {cartState.status === "loading" ? "Adding..." : "Add to Cart"}
              </button>

              <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                Buy Now
              </button>
            </div>
            {product.description && (
              <div className="mt-4 text-sm text-gray-700">
                <p className="font-medium mb-1">Description:</p>
                <p className="leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
              <p>Available offers:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>5% cashback on Axis Bank Credit Card</li>
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



