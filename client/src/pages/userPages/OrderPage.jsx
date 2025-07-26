import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/userCom/common/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../redux/features/user/order/orderAction";

export default function OrdersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderData, loading, totalPages, error } = useSelector((state) => state.order)
  console.log("totalPages:", totalPages);

  const [page, setPage] = useState(1)
  const limit = 5

  useEffect(() => {
    dispatch(getOrders({ page, limit }))
  }, [dispatch, page, limit])


  const isOrderNew = (orderDate) => {
    const orderDay = new Date(orderDate);
    const today = new Date();
    return (
      orderDay.getDate() === today.getDate() &&
      orderDay.getMonth() === today.getMonth() &&
      orderDay.getFullYear() === today.getFullYear()
    );
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <h2 className="lg:text-xl text-lg font-semibold mb-6">My Orders</h2>

        {loading && <p className="text-sm text-gray-500">Loading orders...</p>}
        {error && <p className="text-sm text-red-500">Error: {error}</p>}

        {!loading && (!orderData.orders || orderData.orders.length === 0) && (
          <p className="text-sm text-gray-600">No orders found.</p>
        )}

        <div className="space-y-4">
          {orderData.orders &&
            orderData.orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow rounded p-4 md:flex md:items-center md:justify-between cursor-pointer hover:bg-gray-100 transition"
                onClick={() => navigate(`/order/${order._id}`)}
              >
                <div className="space-y-1">
                  <p className="lg:text-lg text-sm text-gray-700 font-medium flex items-center space-x-2">
                    <span>Order #{order._id.slice(-6).toUpperCase()}</span>
                    {isOrderNew(order.createdAt) && (
                      <span className="bg-green-600 text-white lg:text-sm text-xs px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </p>
                  <p className="lg:text-sm text-xs text-gray-500">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="lg:text-sm text-xs text-gray-500">
                    Status:{" "}
                    <span
                      className={
                        order.status === "cancelled"
                          ? "text-red-500"
                          : order.status === "delivered"
                            ? "text-green-600"
                            : order.status === "pending"
                              ? "text-orange-500"
                              : order.status === "confirmed"
                                ? "text-blue-500"
                                : order.status === "shipped"
                                  ? "text-purple-500"
                                  : "text-gray-500"
                      }
                    >
                      {order.status}
                    </span>
                  </p>



                </div>
                <div className="lg:text-md text-sm mt-2 md:mt-0 text-right">
                  <p>{order.items.length} Item(s)</p>
                  <p className="font-semibold">₹{order.pricingSummary?.finalAmount}</p>
                  <button className="mt-2 text-blue-600 text-xs underline">Details</button>
                </div>
              </div>
            ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center flex-wrap gap-4 mt-10 px-4 sm:px-0">

            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="lg:text-base text-xs px-5 py-3 rounded-xl bg-gray-100 text-gray-700 shadow-neumorph
             disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
             hover:shadow-neumorph-hover focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            >prev</button>

            <span className="lg:text-base text-xs px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="lg:text-base text-xs px-5 py-3 rounded-xl bg-gray-100 text-gray-700 shadow-neumorph
             disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
             hover:shadow-neumorph-hover focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}



