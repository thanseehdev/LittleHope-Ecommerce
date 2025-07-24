import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/userCom/common/Navbar";
import AddAddressModal from "../../components/userCom/address/AddAddressModal";
import { getAddress, getCoupon, addAddress } from "../../redux/features/user/profile/profileAction";
import { getCartItems } from "../../redux/features/user/cart/cartAction";
import { TagIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
import { postOrder } from "../../redux/features/user/order/orderAction";
import {
    FaCreditCard,
    FaWallet,
    FaMoneyBillAlt,
    FaUniversity,
    FaMobileAlt,
} from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";





const paymentOptions = [
    { label: "Cash on Delivery (Cash)", value: "cod", icon: <FaMoneyBillAlt className="text-gray-700" /> },
    { label: "UPI (Pay via any App)", value: "upi", icon: <FaMobileAlt className="text-blue-500" /> },
    { label: "Credit/Debit Card", value: "card", icon: <FaCreditCard className="text-green-600" /> },
    { label: "Wallets", value: "wallet", icon: <FaWallet className="text-yellow-500" /> },
    { label: "Net Banking", value: "netbanking", icon: <FaUniversity className="text-purple-600" /> },
];

export default function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addresses = [], coupons = [] } = useSelector((state) => state.profile);
    const { items } = useSelector((state) => state.cart);

    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState("cod");
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    useEffect(() => {
        dispatch(getAddress());
        dispatch(getCartItems());
        dispatch(getCoupon());
    }, [dispatch]);

    useEffect(() => {
        if (addresses.length > 0) {
            setSelectedAddressId(addresses[0]._id);
        } else {
            setSelectedAddressId(null);
        }
    }, [addresses]);

    const handleSelectAddress = (id) => setSelectedAddressId(id);

    const handleSaveAddress = async (formData) => {
        console.log('data', formData);
        await dispatch(addAddress(formData))
        dispatch(getAddress())
        setShowAddModal(false);
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

    const handlePlaceOrder = () => {
        if (!selectedAddressId) {
            alert("Please select an address.");
            return;
        }

        if (!selectedPayment) {
            alert("Please select a payment method.");
            return;
        }

        const selectedAddress = addresses.find(addr => addr._id === selectedAddressId);
        if (!selectedAddress) {
            alert("Selected address not found.");
            return;
        }

        const orderData = {
            addressInfo: {
                fullName: selectedAddress.fullName,
                landmark: selectedAddress.landmark,
                city: selectedAddress.city,
                zipCode: selectedAddress.zipCode,
                mobileNo: selectedAddress.mobileNo,
            },
            paymentMethod: selectedPayment,
            coupon: selectedCoupon?._id || null,
            items: items.map((item) => ({
                productId: item.productId._id,
                quantity: item.quantity,
                size: item.size,
                priceAtPurchase: item.productId.price,
                discountPriceAtPurchase: item.productId.discountPrice || item.productId.price,
            })),
            pricingSummary: {
                totalMRP: cartSummary.totalMRP,
                totalDiscount: cartSummary.totalDiscount,
                platformFee,
                couponDiscount,
                finalAmount: totalAfterCoupon,
            },
        };

        dispatch(postOrder(orderData, navigate));
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white px-4 py-6 md:px-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    {/* Page Title */}
                    <h1 className="lg:text-xl text-lg md:text-2xl font-semibold text-gray-800">Checkout</h1>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left: Address and Payment */}
                        <div className="lg:col-span-2 space-y-4">

                            {/* Address Section */}
                            <section className="p-4 border border-gray-200 rounded">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="lg:text-lg text-base  font-semibold text-gray-800">Delivery Address</h2>
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="text-sm text-pink-600 hover:underline"
                                    >
                                        + Add Address
                                    </button>
                                </div>
                                {addresses.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No saved addresses.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {addresses.map((address) => (
                                            <div
                                                key={address._id}
                                                onClick={() => handleSelectAddress(address._id)}
                                                className={`p-3 border rounded-md transition cursor-pointer ${selectedAddressId === address._id
                                                    ? "border-pink-500 bg-pink-50"
                                                    : "border-gray-200 hover:shadow"
                                                    }`}
                                            >
                                                <div className="flex items-center lg:text-base text-sm font-semibold text-gray-800 mb-2 space-x-2">
                                                    <span>{address.fullName}</span>
                                                    <span className="text-gray-400">|</span>
                                                    <span>{address.mobileNo}</span>
                                                </div>
                                                <div className="lg:text-base text-sm text-gray-700 leading-relaxed">
                                                    {address.landmark}<br />
                                                    {address.city} - {address.zipCode}
                                                </div>
                                                {address.cod && (
                                                    <div className="text-xs text-green-600 mt-1">✓ Pay on Delivery Available</div>
                                                )}
                                            </div>

                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Payment Section */}
                            <section className="p-4 border border-gray-200 rounded">
                                <p className="mb-4 text-[10px] sm:text-xs text-gray-700 bg-yellow-100 border border-yellow-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-2">
                                    <strong className="text-yellow-800 text-[11px] sm:text-sm flex items-center gap-1">
                                        <span role="img" aria-label="warning">⚠️</span> Note:
                                    </strong>
                                    <span className="font-semibold">Only Cash on Delivery</span> payment is available.
                                </p>

                                <h2 className="lg:text-lg text-base font-semibold text-gray-800 mb-4">Payment Method</h2>
                                <div className="space-y-3">
                                    {paymentOptions.map((option) => {
                                        const isAvailable = option.value === "cod"; // Only COD is available
                                        return (
                                            <label
                                                key={option.value}
                                                className={`flex items-center justify-between p-3 border rounded-md ${isAvailable ? "cursor-pointer" : "cursor-not-allowed opacity-100"
                                                    } ${selectedPayment === option.value && isAvailable
                                                        ? "border-pink-500 bg-pink-50"
                                                        : "border-gray-200 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {option.icon}
                                                    <span className="text-sm text-gray-700">{option.label}</span>
                                                </div>

                                                <div className="flex items-center justify-center w-5 h-5">
                                                    {isAvailable ? (
                                                        <input
                                                            type="radio"
                                                            className="accent-pink-600"
                                                            checked={selectedPayment === option.value}
                                                            onChange={() => setSelectedPayment(option.value)}
                                                        />
                                                    ) : (
                                                        <HiLockClosed
                                                            className="text-gray-500"
                                                            title="Payment method locked"
                                                            size={16}
                                                        />
                                                    )}
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </section>

                        </div>

                        {/* Right: Order Summary */}
                        <div className="sticky top-4 space-y-6">
                            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                                <h3 className="lg:text-lg text-base font-semibold text-gray-800 mb-4">
                                    Order Summary <span className="text-sm">({items?.length || 0} Items)</span>
                                </h3>
                                <div className="space-y-2 text-sm text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Total MRP</span>
                                        <span>₹{cartSummary.totalMRP}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>- ₹{cartSummary.totalDiscount}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Platform Fee</span>
                                        <span>₹{platformFee}</span>
                                    </div>
                                    {selectedCoupon && (
                                        <div className="flex justify-between text-blue-600">
                                            <span>Coupon ({selectedCoupon.code})</span>
                                            <span>- ₹{selectedCoupon.discount}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-dashed border-gray-300 my-4"></div>
                                    <div className="flex justify-between text-base font-semibold text-gray-800">
                                        <span>Total</span>
                                        <span>₹{totalAfterCoupon}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Coupon & Place Order */}
                            <div className="rounded bg-white shadow-md border border-gray-200 p-6 space-y-6">
                                {/* Coupon Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TagIcon className="w-5 h-5 text-purple-600" />
                                        <h3 className="text-sm font-semibold text-gray-800">Discount Coupon</h3>
                                    </div>
                                    {coupons.length > 0 ? (
                                        <select
                                            onChange={handleApplyCoupon}
                                            value={selectedCoupon?._id || ""}
                                            className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        >
                                            <option value="">Choose one</option>
                                            {coupons.map((coupon) => (
                                                <option key={coupon._id} value={coupon._id}>
                                                    {coupon.code}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className="text-sm text-gray-400 italic">No coupons available</span>
                                    )}
                                </div>

                                {/* Divider */}
                                <hr className="border-gray-200" />

                                {/* Place Order Button */}
                                <button
                                    disabled={!selectedAddressId || !selectedPayment || items.length === 0}
                                    onClick={handlePlaceOrder}
                                    className={`w-full py-3 rounded-lg font-semibold text-white transition ${!selectedAddressId || !selectedPayment || items.length === 0
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-pink-600 hover:bg-purple-700"
                                        }`}
                                >
                                    PLACE ORDER
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Modal */}
                <AddAddressModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSave={handleSaveAddress}
                />
            </div>
        </>

    );

}












