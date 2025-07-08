import React, { useEffect, useState } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetail } from "../../redux/features/user/product/productDetailAction";

const sizes = ["28", "30", "32", "34"];

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.productDetail);

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
                  className={`w-16 h-20 rounded border cursor-pointer ${
                    selectedImage === img ? "border-pink-400" : ""
                  }`}
                />
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 ">
              <img
  src={selectedImage}
  alt="Main Product"
  className="rounded-lg w-full h-[450px]  lg:h-[600px] object-cover"
/>

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
            {product.description && (
  <div className="mt-4 text-sm text-gray-700">
    <p className="font-medium mb-1">Description:</p>
    <p className="leading-relaxed">{product.description}</p>
  </div>
)}

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


