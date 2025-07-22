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
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Checkout</h1>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left: Address and Payment */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Address Section */}
                            <section className="p-4 border border-gray-200 rounded">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Delivery Address</h2>
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
                                                <div className="text-sm font-medium text-gray-700">
                                                    {address.fullName} • {address.city}
                                                </div>
                                                <div className="text-xs text-gray-600">{address.landmark}</div>
                                                <div className="text-xs">Mobile: {address.mobileNo}</div>
                                                <div className="text-xs">Pin: {address.zipCode}</div>
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
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
                                <div className="space-y-3">
                                    {paymentOptions.map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex items-center justify-between p-3 border rounded-md cursor-pointer ${selectedPayment === option.value
                                                    ? "border-pink-500 bg-pink-50"
                                                    : "border-gray-200 hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {option.icon}
                                                <span className="text-sm text-gray-700">{option.label}</span>
                                            </div>
                                            <input
                                                type="radio"
                                                className="accent-pink-600"
                                                checked={selectedPayment === option.value}
                                                onChange={() => setSelectedPayment(option.value)}
                                            />
                                        </label>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="sticky top-4 space-y-6">
                            <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Order Summary ({items?.length || 0} Items)
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
                                    <hr className="my-3" />
                                    <div className="flex justify-between text-base font-semibold text-gray-800">
                                        <span>Total</span>
                                        <span>₹{totalAfterCoupon}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Coupon & Place Order */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <TagIcon className="w-5 h-5 text-indigo-600" />
                                    <span>Apply Coupon:</span>
                                    {coupons.length > 0 ? (
                                        <select
                                            onChange={handleApplyCoupon}
                                            value={selectedCoupon?._id || ""}
                                            className="border px-2 py-1 rounded-md text-sm focus:ring-2 focus:ring-pink-500"
                                        >
                                            <option value="">-- Select --</option>
                                            {coupons.map((coupon) => (
                                                <option key={coupon._id} value={coupon._id}>
                                                    {coupon.code}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className="italic text-gray-400">No coupons</span>
                                    )}
                                </div>
                                <button
                                disabled={!selectedAddressId || !selectedPayment || items.length === 0}
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition"
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












