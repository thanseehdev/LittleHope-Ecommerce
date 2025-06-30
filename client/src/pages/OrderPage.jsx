import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const orders = [
  {
    id: "ORD123456",
    date: "28 June 2025",
    status: "Delivered",
    total: "₹619",
    items: 1,
  },
  {
    id: "ORD123457",
    date: "24 June 2025",
    status: "Shipped",
    total: "₹899",
    items: 2,
  },
];

export default function OrdersPage() {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h2 className="text-xl font-bold mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow rounded p-4 md:flex md:items-center md:justify-between cursor-pointer hover:bg-pink-50 transition"
            onClick={() => navigate(`/order/${order.id}`)}
          >
            <div className="space-y-1">
              <p className="text-sm text-gray-700 font-medium">Order #{order.id}</p>
              <p className="text-xs text-gray-500">Placed on {order.date}</p>
              <p className="text-xs text-gray-500">Status: {order.status}</p>
            </div>
            <div className="text-sm mt-2 md:mt-0 text-right">
              <p>{order.items} Item(s)</p>
              <p className="font-semibold">{order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
