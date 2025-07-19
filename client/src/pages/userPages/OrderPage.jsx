import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/userCom/common/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../redux/features/user/order/orderAction";

export default function OrdersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderData, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <h2 className="text-xl font-bold mb-6">My Orders</h2>

        {loading && <p className="text-sm text-gray-500">Loading orders...</p>}
        {error && <p className="text-sm text-red-500">Error: {error}</p>}

        {!loading && orderData.length === 0 && (
          <p className="text-sm text-gray-600">No orders found.</p>
        )}

        <div className="space-y-4">
          {orderData.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow rounded p-4 md:flex md:items-center md:justify-between cursor-pointer hover:bg-pink-50 transition"
              onClick={() => navigate(`/order/${order._id}`)}
            >
              <div className="space-y-1">
                <p className="text-sm text-gray-700 font-medium">
                  Order #{order._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-xs text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">Status: {order.status}</p>
              </div>
              <div className="text-sm mt-2 md:mt-0 text-right">
                <p>{order.items.length} Item(s)</p>
                <p className="font-semibold">₹{order.pricingSummary?.finalAmount}</p>
                 <button
className="mt-2 text-blue-600 text-xs underline">
        Details
      </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

