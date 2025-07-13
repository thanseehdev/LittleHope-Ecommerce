import React, { useEffect } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, updateQuantity } from "../../redux/features/user/cart/cartAction";

export default function CartPage() {
  const dispatch = useDispatch();

  const { items = [], loading, error } = useSelector((state) => state.cart);

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

  const handleQtyChange = async (id, newQty) => {
    const item = items.find((i) => i.productId._id === id);
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
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-6 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              My Cart{" "}
              <span className="text-gray-500 text-sm">
                ({cartItems.length} items)
              </span>
            </h2>

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[150px] h-[150px] rounded-md object-cover"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                      </div>
                      <button
                        className="text-red-500 text-sm hover:underline"
                        onClick={() => handleRemove(item.id, item.size)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 text-sm text-gray-700">
                      <span className="mr-4">
                        Size: <strong>{item.size}</strong>
                      </span>
                      <label>
                        Qty:{" "}
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            handleQtyChange(item.id, e.target.value)
                          }
                          className="ml-1 border rounded px-2 py-1 bg-white"
                        >
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="mt-3 flex items-center space-x-2">
                      <span className="text-lg font-semibold text-gray-800">
                        ₹{item.price * item.qty}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.originalPrice * item.qty}
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        {item.discount}% OFF
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      7 days return available
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Price Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Price Details
            </h3>
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
              <hr />
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-pink-600 hover:bg-pink-700 transition text-white py-2 rounded-md font-semibold">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}



