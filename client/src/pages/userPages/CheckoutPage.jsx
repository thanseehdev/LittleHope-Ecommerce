import React, { useState } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import { FaCreditCard, FaWallet, FaMoneyBillAlt, FaUniversity, FaMobileAlt } from "react-icons/fa"; // Importing icons

const paymentOptions = [
   
    { label: "Cash on Delivery (Cash/UPI)", value: "cod", icon: <FaMoneyBillAlt className="text-gray-700" /> },
    { label: "UPI (Pay via any App)", value: "upi", icon: <FaMobileAlt className="text-blue-500" /> },
    { label: "Credit/Debit Card", value: "card", icon: <FaCreditCard className="text-green-600" /> },
    { label: "Wallets", value: "wallet", icon: <FaWallet className="text-yellow-500" /> },
    { label: "Net Banking", value: "netbanking", icon: <FaUniversity className="text-purple-600" /> },
];

export default function checkoutPayment() {
    const [selected, setSelected] = useState("cod");

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <div className="max-w-5xl mx-auto bg-white p-4 md:p-8 rounded shadow">
                    {/* Top: Bank Offer */}
                    <div className="border p-4 mb-6 bg-gray-50 rounded">
                        <h3 className="text-sm font-semibold">💳 Bank Offer</h3>
                        <p className="text-xs mt-1 text-gray-600">
                            10% Instant Discount on AU Bank Credit Card on a min spend of ₹3,500. TCA
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Payment Modes */}
                        <div className="w-full lg:w-2/3">
                            <h2 className="text-lg font-semibold mb-4">Choose Payment Mode</h2>
                            <div className="flex flex-col gap-2">
                                {paymentOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => setSelected(option.value)}
                                        className={`flex items-center justify-between p-4 border rounded cursor-pointer ${selected === option.value ? "border-pink-500 bg-pink-50" : "border-gray-300"
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span>{option.icon}</span>
                                            <span className="text-sm">{option.label}</span>
                                        </span>
                                        <input
                                            type="radio"
                                            checked={selected === option.value}
                                            onChange={() => setSelected(option.value)}
                                            className="accent-pink-600"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Details */}
                        <div className="w-full lg:w-1/3 border rounded p-4 bg-gray-50">
                            <h2 className="text-lg font-semibold mb-4">Price Details (1 Item)</h2>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Total MRP</span>
                                <span>₹1,499</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2 text-green-600">
                                <span>Discount on MRP</span>
                                <span>- ₹900</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2 text-gray-600">
                                <span>
                                    Platform Fee <span className="text-pink-600 cursor-pointer">Know More</span>
                                </span>
                                <span>₹20</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-semibold text-base">
                                <span>Total Amount</span>
                                <span>₹619</span>
                            </div>
                        </div>
                    </div>

                    {/* Gift Card Section */}
                    <div className="mt-8 text-sm flex justify-between items-center">
                        <span>Have a Coupon ?</span>
                        <button className="text-pink-600 font-semibold text-sm">APPLY COUPON</button>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded text-sm font-semibold transition">
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
