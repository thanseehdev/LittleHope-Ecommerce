import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/userCom/common/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, cancellOrder } from "../../redux/features/user/order/orderAction";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  TruckIcon,
  HomeIcon,
  ClipboardDocumentCheckIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { orderDetail, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) dispatch(getOrderDetails(orderId));
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

  const currentStep = statusIndex[order?.status] ?? 0;

  const handleCancelOrder = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      await dispatch(cancellOrder(order._id));
      dispatch(getOrderDetails(orderId));
    }
  };

  if (loading) return <p className="p-8 text-gray-600">Loading order...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;
  if (!order || !order.items) return <p className="p-8">Order not found.</p>;

  return (
    <>
      <Navbar />

      {/* Header */}
      <header className="bg-gradient-to-r from-pink-600 to-pink-400 p-6 text-white shadow-sm mb-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Order #{order._id.slice(-6).toUpperCase()}</h1>
          <p className="mt-1 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
          <div className="mt-3 flex items-center gap-4">
            <span className="bg-white text-pink-600 font-medium px-3 py-1 rounded-full shadow-sm">
              {order.status.toUpperCase()}
            </span>
            {order.status === "pending" && (
              <button
                onClick={handleCancelOrder}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm transition duration-200"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 space-y-8">

        {/* Items */}
        <section className="space-y-3">
          {order.items.map((item, i) => (
            <div
              key={i}
              className=" flex bg-white  border border-gray-200"
            >
              {/* Left: Image */}
              <div className="w-[100px] h-[100px]">
                <Link key={item.productId} to={`/productDetails/${item.productId._id}`}>
                  <img
                    src={item.productId.images[0]}
                    alt={item.productId.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>

              {/* Right: Content */}
              <div className="flex-1 p-3 flex justify-between items-center">
                <div>
                  <h4 className="lg:text-base text-sm font-semibold text-gray-900">
                    {item.productId.name}
                  </h4>
                  <p className="lg:text-sm text-xs text-gray-600 mt-0.5">
                    Size: <span className="font-medium">{item.size}</span> &bull; Qty:{" "}
                    <span className="font-medium">{item.quantity}</span>
                  </p>
                </div>
                <div className="lg:text-base text-sm font-semibold text-pink-500">
                  ₹{item.discountPriceAtPurchase}
                </div>
              </div>
            </div>
          ))}
        </section>





        {/* Address */}
        <section className="bg-white border  p-4 text-sm max-w-md ">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Delivery Address</h3>

          <div className="flex items-center lg:text-base font-semibold text-gray-800 mb-2 space-x-2">
            <span>{order.addressInfo.fullName}</span>
            <span className="text-gray-400">|</span>
            <span>{order.addressInfo.mobileNo}</span>
          </div>

          <div className="lg:text-base text-gray-700 leading-relaxed">
            {order.addressInfo.landmark}<br />
            {order.addressInfo.city} - {order.addressInfo.zipCode}
          </div>
        </section>



        {/* Tracking or Status Message */}
        <section className="bg-gray-50 border-t bg-white p-3 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {order.status === "cancelled" ? (
            <div className="flex items-center bg-red-500 text-white px-6 py-4 rounded-md mb-5 shadow-md mt-6">
              <XCircleIcon className="w-6 h-6 mr-3" />
              <div>
                <p className="text-sm">Your order has been cancelled.</p>
              </div>
            </div>
          ) : order.status === "delivered" ? (
            <div className="flex items-center bg-green-600 text-white px-6 py-4 mb-5 shadow-md mt-6">
              <CheckCircleIcon className="w-6 h-6 mr-3" />
              <div>
                <p className="text-sm">Order was delivered successfully.</p>
              </div>
            </div>
          ) : (
            <div className=" max-w-3xl  mx-auto  py-4 mb-6">
              <h3 className="text-lg font-semibold mb-5">Order Tracking</h3>
              <div className="relative mb-8">
                {/* Base Progress Bar */}
                <div className="absolute top-5 left-8 right-8 h-1 bg-gray-300 z-0"></div>

                {/* Progress Fill */}
                <div
                  className="absolute top-5 left-8 h-1 bg-pink-500 z-10 transition-all duration-500"
                  style={{
                    width: `calc(${(currentStep / (steps.length - 1)) * 100}% - ${currentStep === steps.length - 1 ? "4rem" : "2rem"
                      })`,
                  }}
                ></div>

                {/* Step Icons */}
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
                        className={`lg:text text-xs ${index <= currentStep ? "text-blue-900" : "text-gray-500"
                          }`}
                      >
                        {step.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="lg:text-sm text-xs text-gray-500 mt-3">
                <strong>Note:</strong> You can only cancel the order while it is in the <strong>'Processed'</strong> status.
              </p>

            </div>
          )}
        </section>

      </main>
    </>
  );
}




