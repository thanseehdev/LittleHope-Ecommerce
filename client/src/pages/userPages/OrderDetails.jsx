import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/userCom/common/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails,cancellOrder } from "../../redux/features/user/order/orderAction"; // Assuming you have cancelOrder action
import {
  CheckCircleIcon,
  TruckIcon,
  HomeIcon,
  ClipboardDocumentCheckIcon,
  XCircleIcon, // Icon for cancel order button
} from "@heroicons/react/24/solid";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { orderDetail, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  const order = orderDetail;

  const steps = [
    { title: "Order Processed", icon: ClipboardDocumentCheckIcon },
    { title: "Order Confirmed", icon: CheckCircleIcon },
    { title: "Order Shipped", icon: TruckIcon },
    { title: "Order Delivered", icon: HomeIcon },
  ];

  const statusIndex = {
    pending: 0,
    confirmed: 1,
    shipped: 2,
    delivered: 3,
  };

  const currentStep = statusIndex[order.status] ?? 0;

  // Handle cancel order click
  const handleCancelOrder = async() => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      await dispatch(cancellOrder(order._id)); // Dispatch cancel order action
      dispatch(getOrderDetails(orderId))
    }
  };

  if (loading) return <p className="p-8 text-gray-600">Loading order...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;
  if (!order || !order.items) return <p className="p-8">Order not found.</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 ">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">Order #{order._id.slice(-6).toUpperCase()}</h2>

          <div className="mb-6">
            <p className="text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-sm">
              Status: <span className="text-green-600 font-semibold">{order.status}</span>
            </p>
            <p className="text-sm">
              Total Amount: ₹{order.pricingSummary?.finalAmount.toFixed(2)}
            </p>
            <p className="text-sm">
              Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod.toUpperCase()}
            </p>
          </div>

          {/* Items */}
          <h3 className="font-semibold mb-2">Items</h3>
          {order.items.map((item, index) => {
            const product = item.productId;

            if (!product) {
              return (
                <div key={index} className="flex items-center gap-4 border-b py-4 text-red-500">
                  <p>Product data missing for item #{index + 1}</p>
                </div>
              );
            }

            return (
              <div key={index} className="flex items-center gap-4 border-b py-4">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="w-24 h-24 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm font-semibold mt-1">₹{item.discountPriceAtPurchase}</p>
                </div>
              </div>
            );
          })}

          {/* Shipping Address */}
          {/* Shipping Address */}
          <div className="border-b mt-3 py-4">
            <h3 className="text-lg font-semibold mb-3">Delivery Address</h3>
            <div className="bg-gray-100 p-4 rounded shadow-sm">
              <p className="font-semibold text-base mb-1">
                {order.addressInfo?.fullName}{" "}
                <span className=" font-normal  ml-3">
                  {order.addressInfo?.mobileNo}
                </span>
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {order.addressInfo?.landmark}, {order.addressInfo?.city},{" "}
                {order.addressInfo?.state} - {order.addressInfo?.zipCode}
              </p>
            </div>
          </div>


        {/* Tracking Progress OR Status Box */}
{order.status === "cancelled" ? (
  <div className="flex items-center bg-red-500 text-white px-6 py-4 rounded-md shadow mt-6">
    <XCircleIcon className="w-6 h-6 mr-3" />
    <div>
      <p className="text-sm">Your order has been cancelled.</p>
    </div>
  </div>
) : order.status === "delivered" ? (
  <div className="flex items-center bg-green-500 text-white px-6 py-4 rounded-md shadow mt-6">
    <CheckCircleIcon className="w-6 h-6 mr-3" />
    <div>
      <p className="font-semibold text-lg">Delivered</p>
      <p className="text-sm">Your order was delivered successfully.</p>
    </div>
  </div>
) : (
  <div className="max-w-3xl mx-auto bg-white py-4 mt-5">
    <h3 className="text-lg font-semibold mb-5 ">Order Tracking</h3>
    <div className="relative mb-8">
      <div className="absolute top-5 left-8 right-8 h-1 bg-gray-300 z-0"></div>
      <div
        className="absolute top-5 left-8 h-1 bg-pink-500 z-10 transition-all duration-500"
        style={{
          width: `calc(${(currentStep / (steps.length - 1)) * 100}% - ${
            currentStep === steps.length - 1 ? "4rem" : "2rem"
          })`,
        }}
      ></div>
      <div className="flex justify-between items-center relative z-20">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col mr-2 items-center text-center">
            <div
              className={`rounded-full p-2 mb-2 ${
                index <= currentStep ? "bg-pink-500 text-white" : "bg-gray-300 text-gray-500"
              }`}
            >
              <step.icon className="w-6 h-6" />
            </div>
            <p
              className={`text-xs ${
                index <= currentStep ? "text-blue-900" : "text-gray-500"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}



          {/* Cancel Order Button */}
      {order.status === "pending" && (
  <div className="mt-6">
    <button
      onClick={handleCancelOrder}
      className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 flex items-center justify-center"
    >
      <XCircleIcon className="w-5 h-5 mr-2" />
      Cancel Order
    </button>
    {/* Warning Note */}
    <p className="text-sm text-gray-500 mt-3">
      <strong>Note:</strong> You can only cancel the order while it is in the <strong>'Processing'</strong> status.
    </p>
  </div>
)}

        </div>
      </div>
    </>
  );
}



