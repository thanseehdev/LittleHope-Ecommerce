import React, { useState } from "react";
import AdminNavbar from "../../components/adminCom/common/Navbar";

const initialOrders = [
  {
    id: "1001",
    customer: "John Doe",
    date: "2025-06-20",
    status: "Processing",
    total: "$150.00",
  },
  {
    id: "1002",
    customer: "Jane Smith",
    date: "2025-06-18",
    status: "Shipped",
    total: "$250.00",
  },
  {
    id: "1003",
    customer: "Alice Johnson",
    date: "2025-06-15",
    status: "Delivered",
    total: "$350.00",
  },
  // Add more orders here
];

const statusColors = {
  Pending: "bg-gray-100 text-gray-800",
  Confirmed: "bg-purple-100 text-purple-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const allStatuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
];

export default function AdminOrderPage() {
  const [orders, setOrders] = useState(initialOrders);

  // Handler to update the status of an order
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        {/* Large screen table */}
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
                  key={order.id}
                  className="hover:bg-gray-50 border-b last:border-b-0"
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">
                    <select
                      className={`px-2 py-1 rounded-full text-sm font-semibold cursor-pointer ${statusColors[order.status]}`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      {allStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-right">{order.total}</td>
                  <td className="p-3 text-center">
                    <button
                      className="text-blue-600 hover:underline focus:outline-none"
                      onClick={() => alert(`Viewing order ${order.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Small screen cards */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-md p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Order #{order.id}</h2>
                <select
                  className={`px-2 py-1 rounded-full text-sm font-semibold cursor-pointer ${statusColors[order.status]}`}
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
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
                {order.customer}
              </p>
              <p>
                <span className="font-semibold">Date: </span>
                {order.date}
              </p>
              <p>
                <span className="font-semibold">Total: </span>
                {order.total}
              </p>
              <button
                onClick={() => alert(`Viewing order ${order.id}`)}
                className="mt-3 text-blue-600 hover:underline focus:outline-none"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

