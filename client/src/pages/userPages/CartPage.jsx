import React, {useEffect,useState } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, updateQuantity, removeFromCart } from "../../redux/features/user/cart/cartAction";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearMessages } from "../../redux/features/user/message";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import BottomNav from "../../components/userCom/common/BottomNav";

export default function CartPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const { items = [], loading } = useSelector((state) => state.cart);
  const { message, error } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const cartItems = items.map((item, index) => ({
    id: item.productId._id || index,
    title: item.productId.name,
    subtitle: item.productId.description,
    price: item.productId.discountPrice,
    originalPrice: item.productId.price,
    discount: Math.round(
      ((item.productId.price - item.productId.discountPrice) /
        item.productId.price) *
      100
    ),
    size: item.size,
    qty: item.quantity,
    image: item.productId.images[0],
  }));

  const totalMRP = cartItems.reduce((sum, item) => sum + item.originalPrice * item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = totalMRP - totalPrice;
  const platformFee = 20;
  const totalAmount = totalPrice + platformFee;

  const handleQtyChange = async (id, newQty, size) => {
    const item = items.find((i) => i.productId._id === id && i.size === size);
    if (item) {
      await dispatch(
        updateQuantity({
          productId: id,
          size: item.size,
          quantity: parseInt(newQty),
        })
      );
      dispatch(getCartItems());
    }
  };

  const handleRemove = async (id, size) => {

    await dispatch(removeFromCart({ productId: id, size }));
    dispatch(getCartItems());
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setTimeout(() => {
      navigate("/checkoutPayment");
    }, 1500);
  };

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        if (message || error) {
          dispatch(clearMessages());
        }
      }, 2000);
      return () => clearTimeout(timer)
    }
  }, [message, error, dispatch]);


  return (
    <>
      <Navbar />

      {(message || error) && (
        <div
          className="fixed z-50 w-[92%] max-w-sm px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center justify-between left-1/2 -translate-x-1/2 bottom-4 sm:top-6 sm:bottom-auto bg-[#2e3142] text-white"
          role="alert"
          aria-live="assertive"
        >
          <span className="flex items-center gap-2">
            {/* Conditional Icon */}
            {error ? (
              <ExclamationCircleIcon className="h-5 w-5 text-pink-500" />
            ) : (
              <CheckCircleIcon className="h-5 w-5 text-pink-500" />
            )}

            {/* Message or Error */}
            {error || message}
          </span>

          <button
            onClick={() => {
              dispatch(clearMessages());
            }}
            className="text-pink-500 hover:text-pink-400 transition ml-2"
            aria-label="Close alert"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}




     
          {/* Cart Items */}
          <div className="bg-gray-50 min-h-screen px-4 pt-4 md:px-8 mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="lg:text-xl text-lg font-semibold">My Cart</h2>
              <span className="text-gray-500 lg:text-sm text-xs">{cartItems.length || 0} items</span>
            </div>

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center border-none ">
                <img
                  src="/emptyCartTSP.png"
                  alt="Empty Cart"
                  className="mt-10 object-contain lg:h-[500px]"
                />

              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-white p-4 mt-2  shadow flex flex-row items-start gap-4 relative"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-lg font-bold"
                    onClick={() => handleRemove(item.id, item.size)}
                  >
                    ✕
                  </button>
                  <Link key={item.id} to={`/productDetails/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover rounded"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between gap-2">
                    <h3 className="lg:text-lg lg:font-semibold text-sm font-bold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.subtitle}</p>

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 ">
                      <div className="flex items-center text-sm gap-1">
                        <span className="font-medium text-gray-700">Size:</span>
                        <span className="border lg:text-sm text-xs border-gray-300 px-2 py-0.5 rounded-md bg-gray-50">
                          {item.size}
                        </span>
                      </div>

                      <div className="flex items-center text-sm gap-1">
                        <span className="font-medium text-gray-700">Qty:</span>
                        <select
                          value={item.qty}
                          onChange={(e) => handleQtyChange(item.id, e.target.value, item.size)}
                          className="lg:text-base text-xs border rounded  bg-white text-sm"
                        >
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </select>
                      </div>


                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="lg:text-lg font-bold text-gray-800">
                        ₹{item.price * item.qty}
                      </span>
                      <span className="line-through text-gray-500">
                        ₹{item.originalPrice * item.qty}
                      </span>
                      <span className=" text-xs text-orange-600 font-semibold bg-orange-100 px-2 py-0.5 rounded-md">
                        {item.discount}% OFF
                      </span>
                    </div>

                    <div className="text-xs text-gray-500">14 days return available</div>
                    <div className="text-xs text-green-600 font-medium">
                      Delivery by <span className="font-semibold">21 Jul - 23 Jul</span>
                    </div>
                  </div>
                </div>
              ))

            )}
            {cartItems.length > 0 && (
            <div class="lg:flex lg:justify-end ">
      <div className="lg:w-1/2 bg-white mt-10 p-6 rounded-lg shadow-md h-fit sticky top-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Price Details</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Total MRP</span>
            <span>₹{totalMRP}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount on MRP</span>
            <span>-₹{discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee</span>
            <span>₹{platformFee}</span>
          </div>
          <hr className="border-t border-dashed border-gray-300"/>
          <div className="flex justify-between font-semibold text-gray-800 ">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
       <div class="flex justify-end">
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className={`lg:w-[200px] mt-6 w-full py-2 rounded-md font-semibold text-white relative overflow-hidden transition-colors ${
            checkoutLoading ? "bg-pink-700" : "bg-pink-600 hover:bg-pink-700 active:bg-pink-700 focus:bg-pink-700"
          }`}
        >
          {checkoutLoading && (
            <span className="absolute left-0 top-0 h-full w-full bg-pink-700 button-progress-bg z-0"></span>
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {checkoutLoading && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            )}
            {checkoutLoading ? "Processing" : "CHECKOUT"}
          </span>
        </button>
        </div>
      </div>
</div>
    )}
          </div>
    
      
    </>
  );
}



