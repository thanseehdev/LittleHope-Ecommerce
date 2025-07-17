import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/userCom/common/Navbar";
import AddAddressModal from "../../components/userCom/address/AddAddressModal";
import { getAddress, getCoupon } from "../../redux/features/user/profile/profileAction";
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
    const navigate = useNavigate();
    const { addresses = [] } = useSelector((state) => state.profile);
    const { items } = useSelector((state) => state.cart);
    const { coupons } = useSelector((state) => state.profile);

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
            <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-8">
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">

                        {/* Address Selection */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Select Delivery Address</h2>
                                <div className="space-y-4">
                                    {addresses.map((address) => (
                                        <div
                                            key={address._id}
                                            onClick={() => handleSelectAddress(address._id)}
                                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedAddressId === address._id
                                                    ? "border-pink-500 bg-pink-50"
                                                    : "border-gray-200 hover:shadow-sm"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm font-medium text-gray-700">
                                                    {address.fullName} - {address.city.toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="text-sm mt-1 text-gray-600">{address.landmark}</div>
                                            <div className="text-sm mt-1">Mobile: <span className="font-semibold">{address.mobileNo}</span></div>
                                            <div className="text-sm">Pin Code: <span className="font-semibold">{address.zipCode}</span></div>
                                            {address.cod && <div className="text-xs text-green-600 mt-1">✓ Pay on Delivery available</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Payment & Summary */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Choose Payment Method</h2>
                                <div className="space-y-3">
                                    {paymentOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            onClick={() => setSelectedPayment(option.value)}
                                            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition ${selectedPayment === option.value
                                                    ? "border-pink-500 bg-pink-50"
                                                    : "border-gray-200 hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {option.icon}
                                                <span className="text-sm font-medium text-gray-700">{option.label}</span>
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

                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Price Summary ({items?.length || 0} Items)</h2>
                                <div className="text-sm space-y-2 text-gray-700">
                                    <div className="flex justify-between"><span>Total MRP</span><span>₹{cartSummary.totalMRP}</span></div>
                                    <div className="flex justify-between text-green-600"><span>Discount</span><span>- ₹{cartSummary.totalDiscount}</span></div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Platform Fee <span className="text-pink-600 cursor-pointer">Know more</span></span>
                                        <span>₹{platformFee}</span>
                                    </div>
                                    {selectedCoupon && (
                                        <div className="flex justify-between text-blue-600">
                                            <span>Coupon ({selectedCoupon.code})</span>
                                            <span>- ₹{selectedCoupon.discount}</span>
                                        </div>
                                    )}
                                    <hr className="my-3" />
                                    <div className="flex justify-between font-semibold text-gray-800 text-base">
                                        <span>Total Amount</span>
                                        <span>₹{totalAfterCoupon}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t p-6 flex flex-col md:flex-row md:justify-between items-center gap-4 bg-gray-50">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <TagIcon className="h-5 w-5 text-indigo-600" />
                            <span>Apply Coupon:</span>
                            {coupons.length > 0 ? (
                                <select
                                    onChange={handleApplyCoupon}
                                    value={selectedCoupon?._id || ""}
                                    className="border px-3 py-1.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                        <button
                            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-6 py-3 rounded transition"
                            onClick={handlePlaceOrder}
                        >
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











