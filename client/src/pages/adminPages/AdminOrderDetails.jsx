import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../redux/features/admin/adminOrder/adminOrderAction";

const AdminOrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orderDetail: order, loading, error } = useSelector((state) => state.adminOrder);

    useEffect(() => {
        if (id) dispatch(getOrderDetails(id));
    }, [id, dispatch]);

    const formatDate = (date) =>
        new Date(date).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const statusColor = {
        confirmed: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        cancelled: "bg-red-100 text-red-800",
        shipped: "bg-blue-100 text-blue-800",
        delivered: "bg-green-200 text-green-900",
        paid: "bg-green-200 text-green-900",
        unpaid: "bg-red-200 text-red-900",
        failed: "bg-red-200 text-red-900",
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
    if (!order) return null;

    const {
        _id,
        user,
        addressInfo,
        items = [],
        paymentMethod,
        coupon,
        pricingSummary,
        status,
        paymentStatus,
        placedAt,
        updatedAt,
    } = order;

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg space-y-8">
            <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                ← Back to Orders
            </button>

            <h2 className="text-3xl font-bold text-[#1e3a8a] border-b pb-3">🧾 Order Summary</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                {/* Order & User Info */}
                <div className="bg-gray-50 p-4 rounded-lg border space-y-1">
                    <p><strong>Order ID:</strong> {_id}</p>
                    <p><strong>User ID:</strong> {user?._id}</p>
                    <p><strong>User Name:</strong> {user?.name}</p>
                    <p><strong>User Email:</strong> {user?.email}</p>
                    <p><strong>Placed At:</strong> {formatDate(placedAt)}</p>
                    <p><strong>Last Updated:</strong> {formatDate(updatedAt)}</p>
                </div>

                {/* Order Status */}
                <div className="bg-gray-50 p-4 rounded-lg border space-y-2">
                    {status && (
                        <div>
                            <span className="text-gray-600 text-sm font-medium">Order Status:</span>{' '}
                            <span className={`inline-block px-3 py-1 rounded font-semibold text-sm ${statusColor[status]}`}>
                                {status.toUpperCase()}
                            </span>
                        </div>
                    )}
                    {paymentStatus && (
                        <div>
                            <span className="text-gray-600 text-sm font-medium">Payment Status:</span>{' '}
                            <span className={`inline-block px-3 py-1 rounded font-semibold text-sm ${statusColor[paymentStatus]}`}>
                                {paymentStatus.toUpperCase()}
                            </span>
                        </div>
                    )}
                    <p>
                        <strong>Payment Method:</strong> {paymentMethod?.toUpperCase() || "N/A"}
                    </p>
                    {coupon?.code && (
                        <p>
                            <strong>Coupon Applied:</strong> {coupon.code} (₹{coupon.discount})
                        </p>
                    )}
                </div>

            </div>

            {/* Shipping Address */}
            <div className="bg-blue-50 p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">📍 Shipping Address</h3>
                <p><strong>Name:</strong> {addressInfo?.fullName}</p>
                <p><strong>Landmark:</strong> {addressInfo?.landmark}</p>
                <p><strong>City:</strong> {addressInfo?.city}</p>
                <p><strong>PIN Code:</strong> {addressInfo?.zipCode}</p>
                <p><strong>Mobile:</strong> {addressInfo?.mobileNo}</p>
            </div>

            {/* Ordered Items */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-900">🛍️ Ordered Items</h3>
                {items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {items.map((item, index) => (
                            <div key={index} className="bg-white border rounded-md p-4 shadow-sm">
                                <div className="flex items-center space-x-4">
                                    {item.productId?.images?.[0] && (
                                        <img
                                            src={item.productId.images[0]}
                                            alt="Product"
                                            className="h-20 w-20 object-cover rounded"
                                        />
                                    )}
                                    <div>
                                        <p><strong>Name:</strong> {item.productId?.name || "N/A"}</p>
                                        <p><strong>Product ID:</strong> {item.productId?._id || "N/A"}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Size:</strong> {item.size}</p>
                                        <p><strong>MRP:</strong> ₹{item.priceAtPurchase}</p>
                                        <p><strong>Discounted:</strong> ₹{item.discountPriceAtPurchase}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No items found in this order.</p>
                )}
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-gray-100 p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">💰 Pricing Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                    <p><strong>Total MRP:</strong> ₹{pricingSummary?.totalMRP}</p>
                    <p><strong>Total Discount:</strong> -₹{pricingSummary?.totalDiscount}</p>
                    <p><strong>Platform Fee:</strong> ₹{pricingSummary?.platformFee}</p>
                    <p><strong>Coupon Discount:</strong> -₹{pricingSummary?.couponDiscount || 0}</p>
                </div>
                <p className="mt-4 text-xl font-bold text-gray-900">
                    Final Payable Amount: ₹{pricingSummary?.finalAmount}
                </p>
            </div>
        </div>
    );
};

export default AdminOrderDetails;




