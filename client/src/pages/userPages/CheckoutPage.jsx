import React, { useState } from "react";
import Navbar from "../../components/userCom/common/Navbar";
import AddressCard from "../../components/userCom/address/AddressCard";
import {
    FaCreditCard,
    FaWallet,
    FaMoneyBillAlt,
    FaUniversity,
    FaMobileAlt,
    FaPlus
} from "react-icons/fa";

const paymentOptions = [
    { label: "Cash on Delivery (Cash/UPI)", value: "cod", icon: <FaMoneyBillAlt className="text-gray-700" /> },
    { label: "UPI (Pay via any App)", value: "upi", icon: <FaMobileAlt className="text-blue-500" /> },
    { label: "Credit/Debit Card", value: "card", icon: <FaCreditCard className="text-green-600" /> },
    { label: "Wallets", value: "wallet", icon: <FaWallet className="text-yellow-500" /> },
    { label: "Net Banking", value: "netbanking", icon: <FaUniversity className="text-purple-600" /> },
];

export default function CheckoutPage() {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: "Thanseeh",
            tag: "home",
            details: "Kovukunnu, near kovukunn LP SCHOOL, Mokeri, Kovukunn, Kozhikode, Kerala - 673507",
            phone: "9074827805",
            cod: true,
        },
        {
            id: 2,
            name: "Thanseeh",
            tag: "office",
            details: "Mikro Grafeio (Beyond Workspaces), Near 4th Railway Gate, Thervved, Kozhikode, Kerala - 673032",
            phone: "9074827805",
            cod: false,
        },
    ]);

    const [selectedAddressId, setSelectedAddressId] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState("cod");
    const [showAllAddresses, setShowAllAddresses] = useState(false);

    const handleSelectAddress = (id) => setSelectedAddressId(id);
    const handleEditAddress = (id) => alert("Edit address " + id);
    const handleRemoveAddress = (id) => alert("Remove address " + id);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <div className="max-w-6xl mx-auto bg-white p-4 md:p-8 rounded shadow-md space-y-8">

                    {/* Main Checkout Row */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* LEFT: Address Section */}
                        <div className="w-full lg:w-1/2 space-y-6">

                            {/* Header with Add Button */}
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-800">Select Delivery Address</h2>
                                <button
                                    onClick={() => alert("Add New Address")}
                                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm font-medium transition"
                                >
                                    <FaPlus className="inline" />Add New
                                </button>
                            </div>

                            {/* Default Address */}
                            <div>
                                <h3 className="text-sm font-medium mb-2 text-gray-500">DEFAULT ADDRESS</h3>
                                <AddressCard
                                    address={addresses[0]}
                                    isSelected={selectedAddressId === addresses[0].id}
                                    onSelect={() => handleSelectAddress(addresses[0].id)}
                                    onEdit={() => handleEditAddress(addresses[0].id)}
                                    onRemove={() => handleRemoveAddress(addresses[0].id)}
                                />
                            </div>

                            {/* Other Addresses */}
                            {showAllAddresses && addresses.length > 1 && (
                                <div>
                                    <h3 className="text-sm font-medium mb-2 text-gray-500 mt-4">OTHER ADDRESSES</h3>
                                    {addresses.slice(1).map((address) => (
                                        <AddressCard
                                            key={address.id}
                                            address={address}
                                            isSelected={selectedAddressId === address.id}
                                            onSelect={() => handleSelectAddress(address.id)}
                                            onEdit={() => handleEditAddress(address.id)}
                                            onRemove={() => handleRemoveAddress(address.id)}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Show More Button */}
                            {!showAllAddresses && addresses.length > 1 && (
                                <div>
                                    <button
                                        onClick={() => setShowAllAddresses(true)}
                                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-4 py-2 rounded text-sm font-medium transition"
                                    >
                                        Show More

                                    </button>
                                </div>
                            )}
                        </div>



                        {/* RIGHT: Payment and Summary Section */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            {/* Payment */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Payment Mode</h2>
                                <div className="space-y-3">
                                    {paymentOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            onClick={() => setSelectedPayment(option.value)}
                                            className={`flex items-center justify-between p-4 border rounded-lg shadow-sm cursor-pointer transition ${selectedPayment === option.value
                                                    ? "border-pink-500 bg-pink-50"
                                                    : "border-gray-200 bg-white hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {option.icon}
                                                <span className="text-sm font-medium">{option.label}</span>
                                            </div>
                                            <input
                                                type="radio"
                                                checked={selectedPayment === option.value}
                                                onChange={() => setSelectedPayment(option.value)}
                                                className="accent-pink-600"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Details */}
                            <div className="border rounded-xl bg-gray-50 p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Price Details (1 Item)</h2>
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span>Total MRP</span>
                                        <span>₹1,499</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount on MRP</span>
                                        <span>- ₹900</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>
                                            Platform Fee <span className="text-pink-600 cursor-pointer">Know More</span>
                                        </span>
                                        <span>₹20</span>
                                    </div>
                                </div>
                                <hr className="my-3" />
                                <div className="flex justify-between font-semibold text-base">
                                    <span>Total Amount</span>
                                    <span>₹619</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coupon and Place Order */}
                    <div className="flex justify-between items-center text-sm border-t pt-4">
                        <span>Have a Coupon?</span>
                        <button className="text-pink-600 font-semibold hover:underline">APPLY COUPON</button>
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded text-sm font-semibold transition">
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}



