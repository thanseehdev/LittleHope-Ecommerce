import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetail } from "../../redux/features/user/product/productDetailAction";
import { addToCart } from "../../redux/features/user/cart/cartAction";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  
  const { product, loading, error } = useSelector((state) => state.productDetail);
  const cartState = useSelector((state) => state.cart);

  const scrollRef = useRef(null);

  // Dispatch product details fetch when the component is mounted or when `id` changes
  useEffect(() => {
    if (id) {
      dispatch(productDetail(id));
    }
  }, [dispatch, id]);

  // Set the default selected image when the product data is loaded
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

if (!product) {
  return <div>Product not found</div>; // or any loading/fallback UI
}

const discountPercentage = product.price && product.discountPrice ? Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  ) : 0;


  // Handle add to cart action
  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1, size: selectedSize }));
  };

  // Handle dot click for image carousel (mobile view)
  const handleDotClick = (index) => {
    if (scrollRef.current) {
      const scrollToX = index * scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({ left: scrollToX, behavior: "smooth" });
      setSelectedImage(product.images[index]);
    }
  };

  // Handle scroll event for image carousel (mobile view)
  const handleScroll = () => {
    if (scrollRef.current && product.images.length > 0) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setSelectedImage(product.images[index]);
    }
  };

  // Toggle wishlist status
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // You can add Redux dispatch or API call here later
  };

  // Show loading spinner if product data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="loader"></div>
      </div>
    );
  }

  // Show error message if there is any error
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  // If no product is available, return nothing
  if (!product) return null;

  return (
    <>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Image Gallery */}
          {/* Left - Image Gallery */}
<div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4">
  {/* Mobile Carousel */}
  <div className="lg:hidden relative overflow-hidden">
    <div
      className="flex transition-all overflow-x-scroll scroll-smooth snap-x snap-mandatory"
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {product.images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Product ${idx}`}
          className="w-full flex-shrink-0 object-cover h-[400px] snap-center"
          style={{ objectFit: 'cover', width: '100%' }} // Ensure images take full width of container
        />
      ))}
    </div>

    {/* Dots for Carousel */}
    <div className="flex justify-center gap-2 mt-3">
      {product.images.map((img, idx) => (
        <button
          key={idx}
          onClick={() => handleDotClick(idx)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedImage === img ? "bg-pink-500 scale-110" : "bg-gray-300"}`}
        />
      ))}
    </div>
  </div>

  {/* Thumbnails for Large Devices */}
  <div className="hidden lg:flex lg:flex-col gap-2 overflow-auto">
    {product.images.map((img, idx) => (
      <img
        key={idx}
        onClick={() => setSelectedImage(img)}
        src={img}
        alt={`Thumbnail ${idx}`}
        className={`w-16 h-20 rounded border cursor-pointer ${selectedImage === img ? "border-pink-400" : ""}`}
      />
    ))}
  </div>

  {/* Main Image (Only display selected image, depending on screen size) */}
  <div className="relative flex-1">
    {/* Only show main image on large screens or mobile with selected image */}
    <img
      src={selectedImage || "/comingSoon2.png"}
      alt="Main Product"
      className="rounded-lg w-full h-[450px] lg:h-[600px] object-cover"
    />

    {/* Wishlist Button */}
    <button
      onClick={toggleWishlist}
      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition"
      title="Add to Wishlist"
    >
      {isWishlisted ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.01 4.01 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.75C14.09 5.01 15.76 4 17.5 4 19.99 4 22 6.01 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth={2} className="w-6 h-6">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.01 4.01 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.75C14.09 5.01 15.76 4 17.5 4 19.99 4 22 6.01 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
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

            <p className="text-sm text-gray-600">{product.category}</p>

            {/* Select Size */}
            <div>
              <p className="font-medium mb-2 mt-4">Select Size:</p>
              <div className="flex flex-wrap gap-3 rounded">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-[30%] sm:w-auto px-4 py-1 border rounded hover:bg-gray-100 ${selectedSize === size ? "bg-gray-200 border-black" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || cartState.status === "loading"}
                className={`px-6 py-2 rounded text-white ${!selectedSize || cartState.status === "loading" ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
              >
                {cartState.status === "loading" ? "Adding..." : "Add to Cart"}
              </button>
              <button
                onClick={toggleWishlist}
                className="px-6 py-2 rounded border bg-white hover:bg-gray-100"
              >
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



