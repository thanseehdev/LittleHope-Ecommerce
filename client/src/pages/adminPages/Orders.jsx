import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../../components/adminCom/common/Navbar";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../redux/features/admin/adminOrder/adminOrderAction";
import { useNavigate } from "react-router-dom";

const statusColors = {
  pending: "bg-purple-100 text-purple-800",
  confirmed: "bg-yellow-100 text-yellow-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const allStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1)
  const limit = 10

  const { orders, loading, error, totalPages } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrders({ page, limit }));
  }, [dispatch, page]);


  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, Ostatus: newStatus })).unwrap();
      dispatch(getAllOrders({ page, limit }));
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-md shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 border-b">Order ID</th>
                    <th className="text-left p-3 border-b">Customer</th>
                    <th className="text-left p-3 border-b">Date</th>
                    <th className="text-left p-3 border-b">Status</th>
                    <th className="text-right p-3 border-b">Total</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <td className="p-3">{order._id}</td>
                      <td className="p-3">{order.addressInfo.fullName}</td>
                      <td className="p-3">
                        {new Date(order.placedAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className={`px-2 py-1 rounded text-sm font-semibold ${statusColors[order.status]}`}
                        >
                          {allStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        ₹{order.pricingSummary.finalAmount.toFixed(2)}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          className="text-blue-600 hover:underline focus:outline-none"
                          onClick={() =>
                            navigate(`/admin/adminOrderDetails/${order._id}`)
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-md p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-lg">
                      Order #{order._id}
                    </h2>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded text-sm font-semibold ${statusColors[order.status]}`}
                    >
                      {allStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p>
                    <span className="font-semibold">Customer: </span>
                    {order.addressInfo.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">Date: </span>
                    {new Date(order.placedAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Total: </span>
                    ₹{order.pricingSummary.finalAmount.toFixed(2)}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/admin/adminOrderDetails/${order._id}`)
                    }
                    className="mt-3 text-blue-600 hover:underline focus:outline-none"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
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



