import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/userCom/common/Navbar";
import AddressCard from "../../components/userCom/address/AddressCard";
import AddAddressModal from "../../components/userCom/address/AddAddressModal";
import { getAddress, getCoupon } from "../../redux/features/user/profile/profileAction";
import { getCartItems } from "../../redux/features/user/cart/cartAction";
import { TagIcon } from '@heroicons/react/24/outline';
import {
    FaCreditCard,
    FaWallet,
    FaMoneyBillAlt,
    FaUniversity,
    FaMobileAlt,
    FaPlus,
} from "react-icons/fa";

const paymentOptions = [
    { label: "Cash on Delivery (Cash)", value: "cod", icon: <FaMoneyBillAlt className="text-gray-700" /> },
    { label: "UPI (Pay via any App)", value: "upi", icon: <FaMobileAlt className="text-blue-500" /> },
    { label: "Credit/Debit Card", value: "card", icon: <FaCreditCard className="text-green-600" /> },
    { label: "Wallets", value: "wallet", icon: <FaWallet className="text-yellow-500" /> },
    { label: "Net Banking", value: "netbanking", icon: <FaUniversity className="text-purple-600" /> },
];

export default function CheckoutPage() {
    const dispatch = useDispatch();

    const { addresses: rawAddresses } = useSelector((state) => state.profile);
    const { items } = useSelector((state) => state.cart);
    const { coupons } = useSelector((state) => state.profile);

    // Normalize addresses to ensure consistent 'id' field
    const addresses = (rawAddresses || []).map(addr => ({
        ...addr,
        id: addr.id || addr._id,
    }));

    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState("cod");
    const [showAllAddresses, setShowAllAddresses] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    useEffect(() => {
        dispatch(getAddress());
        dispatch(getCartItems());
        dispatch(getCoupon());
    }, [dispatch]);

    useEffect(() => {
        if (addresses.length > 0) {
            setSelectedAddressId(addresses[0].id);
        } else {
            setSelectedAddressId(null);
        }
    }, [addresses]);

    const handleSelectAddress = (id) => setSelectedAddressId(id);
    const handleEditAddress = (id) => alert("Edit address " + id);
    const handleRemoveAddress = (id) => alert("Remove address " + id);

    const handleSaveAddress = (newAddress) => {
        alert("Address saved locally. Backend integration required.");
    };

    const handleApplyCoupon = (e) => {
        const couponId = e.target.value;
        const selected = coupons.find((c) => c._id === couponId);
        setSelectedCoupon(selected || null);
    };

    const cartSummary = items?.length
        ? items.reduce(
            (acc, item) => {
                const product = item.productId;
                const quantity = item.quantity || 1;
                const price = product.price || 0;
                const discountPrice = product.discountPrice || price;
                const mrp = price * quantity;
                const discountedTotal = discountPrice * quantity;
                const discount = mrp - discountedTotal;

                acc.totalMRP += mrp;
                acc.totalDiscount += discount;
                return acc;
            },
            { totalMRP: 0, totalDiscount: 0 }
        )
        : { totalMRP: 0, totalDiscount: 0 };

    const platformFee = 20;
    const totalAmount = cartSummary.totalMRP - cartSummary.totalDiscount + platformFee;
    const couponDiscount = selectedCoupon?.discount || 0;
    const totalAfterCoupon = totalAmount - couponDiscount;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <div className="max-w-6xl mx-auto bg-white p-4 md:p-8 rounded shadow-md space-y-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* LEFT: Address Section */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-gray-800">Select Delivery Address</h2>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm font-medium transition"
                                >
                                    <FaPlus className="inline mr-1" /> Add
                                </button>
                            </div>

                            {addresses.length > 0 ? (
                                <>
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

                                    {!showAllAddresses && addresses.length > 1 && (
                                        <button
                                            onClick={() => setShowAllAddresses(true)}
                                            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-4 py-2 rounded text-sm font-medium transition"
                                        >
                                            Show More
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p className="text-gray-600">No addresses available.</p>
                            )}
                        </div>

                        {/* RIGHT: Payment and Price Section */}
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

                            {/* Price Summary */}
                            <div className="border rounded-xl bg-gray-50 p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    Price Details ({items?.length || 0} Items)
                                </h2>
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span>Total MRP</span>
                                        <span>₹{cartSummary.totalMRP}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount on MRP</span>
                                        <span>- ₹{cartSummary.totalDiscount}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>
                                            Platform Fee <span className="text-pink-600 cursor-pointer">Know More</span>
                                        </span>
                                        <span>₹{platformFee}</span>
                                    </div>
                                    {selectedCoupon && (
                                        <div className="flex justify-between text-blue-600">
                                            <span>Coupon Applied ({selectedCoupon.code})</span>
                                            <span>- ₹{selectedCoupon.discount}</span>
                                        </div>
                                    )}
                                </div>
                                <hr className="my-3" />
                                <div className="flex justify-between font-semibold text-base">
                                    <span>Total Amount</span>
                                    <span>₹{totalAfterCoupon}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coupon Dropdown + Place Order */}
                    <div className="flex items-center justify-between border-t pt-6 mt-4 text-sm">
                        <div className="flex items-center space-x-2">
                            <TagIcon className="h-5 w-5 text-indigo-600" />
                            <span className="font-medium text-gray-700">Apply Coupon:</span>
                        </div>

                        {coupons.length > 0 ? (
                            <select
                                onChange={handleApplyCoupon}
                                value={selectedCoupon?._id || ""}
                                className="border focus:border-pink-500 px-3 py-1.5 rounded-md shadow-sm text-sm text-blue-900 text-center"
                            >
                                <option value="">-- Select Coupon --</option>
                                {coupons.map((coupon) => (
                                    <option key={coupon._id} value={coupon._id}>
                                        {coupon.code}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <span className="text-gray-400 italic">No coupons available</span>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded text-sm font-semibold transition">
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>

            <AddAddressModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleSaveAddress}
            />
        </>
    );
}








