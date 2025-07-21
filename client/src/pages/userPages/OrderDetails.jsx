import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/userCom/common/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, cancellOrder } from "../../redux/features/user/order/orderAction"; // Assuming you have cancelOrder action
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
  const handleCancelOrder = async () => {
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
      <header className="bg-gradient-to-r from-pink-500 to-pink-300 p-6 text-white  mb-6">
  <h1 className="text-2xl font-bold">Order #{order._id.slice(-6).toUpperCase()}</h1>
  <p className="mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
  <span className="inline-block bg-white text-pink-500 px-3 py-1 rounded-full mt-2">
    {order.status.toUpperCase()}
  </span>
  {order.status === "pending" && (
    <button
      onClick={handleCancelOrder}
      className="ml-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full"
    >
      Cancel Order
    </button>
  )}
</header>

<section className="space-y-4 mb-6">
  
  {order.items.map((item, i) => (
    <div key={i} className="flex bg-gray-50 p-4">
      <img src={item.productId.images[0]} alt="" className="w-24 h-24 object-cover rounded" />
      <div className="ml-4 flex-1">
        <h4 className="font-medium">{item.productId.name}</h4>
        <p className="text-sm text-gray-600">Size: {item.size} • Qty: {item.quantity}</p>
        <p className="text-lg font-semibold mt-2">₹{item.discountPriceAtPurchase}</p>
      </div>
    </div>
  ))}
</section>

<section className="bg-white p-4 text-sm border mb-6">
  <h3 className="font-semibold mb-3">Delivery Address</h3>
  <p>{order.addressInfo.fullName}, {order.addressInfo.mobileNo}</p>
  <p>{`${order.addressInfo.landmark}, ${order.addressInfo.city},${order.addressInfo.zipCode}`}</p>
</section>


<section className="bg-white p-4 rounded-lg ">
      {order.status === "cancelled" ? (
            <div className="flex items-center bg-red-500 text-white px-6 py-4 rounded-md shadow mt-6">
              <XCircleIcon className="w-6 h-6 mr-3" />
              <div>
                <p className="text-sm">Your order has been cancelled.</p>
              </div>
            </div>
          ) : order.status === "delivered" ? (
            <div className="flex items-center bg-green-600 text-white px-6 py-4  shadow mt-6">
              <CheckCircleIcon className="w-6 h-6 mr-3" />
              <div>

                <p className="text-sm ">Your order was delivered successfully.</p>
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
                    width: `calc(${(currentStep / (steps.length - 1)) * 100}% - ${currentStep === steps.length - 1 ? "4rem" : "2rem"
                      })`,
                  }}
                ></div>
                <div className="flex justify-between items-center relative z-20">
                  {steps.map((step, index) => (
                    <div key={index} className="flex flex-col mr-2 items-center text-center">
                      <div
                        className={`rounded-full p-2 mb-2 ${index <= currentStep ? "bg-pink-500 text-white" : "bg-gray-300 text-gray-500"
                          }`}
                      >
                        <step.icon className="w-6 h-6" />
                      </div>
                      <p
                        className={`text-xs ${index <= currentStep ? "text-blue-900" : "text-gray-500"
                          }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
                 <p className="text-sm text-gray-500 mt-3">
      <strong>Note:</strong> You can only cancel the order while it is in the <strong>'Processed'</strong> status.
    </p>
            </div>
            
          )}
          </section>
    </>
  );
}



