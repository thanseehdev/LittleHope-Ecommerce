import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/userCom/common/Navbar";

export default function OrderDetailPage() {
  const { orderId } = useParams();

  // You'd normally fetch this from the backend
  const order = {
    id: orderId,
    date: "28 June 2025",
    status: "Delivered",
    total: "₹619",
    items: [
      {
        name: "Kids Fashion Shirt",
        price: "₹619",
        image: "/productsImg/newArrivals-img/new-img2.webp",
        qty: 1,
      },
    ],
    shippingAddress: "123, ABC Nagar, Kochi, Kerala - 682020",
    paymentMode: "Cash on Delivery",
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <h2 className="text-lg font-bold mb-4">Order #{order.id}</h2>

        <div className="mb-6">
          <p className="text-sm">Date: {order.date}</p>
          <p className="text-sm">Status: <span className="text-green-600 font-semibold">{order.status}</span></p>
          <p className="text-sm">Total Amount: {order.total}</p>
          <p className="text-sm">Payment: {order.paymentMode}</p>
        </div>

        <h3 className="font-semibold mb-2">Items</h3>
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 border-b py-4">
            <img src={item.image} alt={item.name} className="w-24 h-24  rounded" />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              <p className="text-sm font-semibold">{item.price}</p>
            </div>
          </div>
        ))}

        <h3 className="font-semibold mt-6 mb-2">Shipping Address</h3>
        <p className="text-sm text-gray-700">{order.shippingAddress}</p>
      </div>
    </div>
    </>
  );
}
