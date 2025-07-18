




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupon } from "../../../redux/features/user/profile/profileAction";
import { FiGift, FiAlertCircle } from "react-icons/fi";

export default function Coupons() {
  const dispatch = useDispatch();
  const { coupons = [], loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🎉 My Coupons</h2>

      {loading && (
        <div className="text-gray-600 animate-pulse">Loading coupons...</div>
      )}

      {error && (
        <div className="flex items-center text-red-600 mb-4">
          <FiAlertCircle className="mr-2" />
          <span>Error: {error}</span>
        </div>
      )}

      <div className="space-y-3">
        {coupons.length > 0 ? (
          coupons.map((coupon, index) => (
            <div
              key={coupon._id}
              className={`flex items-center  overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                index % 2 === 0 ? "bg-blue-50" : "bg-yellow-50"
              }`}
            >
              {/* Left Icon Area */}
              <div
                className={`w-1/3 flex items-center justify-center py-6 ${
                  index % 2 === 0 ? "bg-blue-100" : "bg-yellow-100"
                }`}
              >
                <FiGift
                  className={`text-4xl ${
                    index % 2 === 0 ? "text-blue-600" : "text-yellow-600"
                  }`}
                />
              </div>

              {/* Text Content */}
              <div className="w-2/3 p-4">
                <p className="text-sm text-gray-700 mb-1">
                Use code: <span className="font-mono font-bold text-blue-700">{coupon.code}</span>
              </p>
                 <span className="text-lg font-semibold text-gray-800">
                  ₹{coupon.discount} OFF
                </span>
                 <p className="text-xs text-gray-600">
                Expires on{" "}
                <span className="font-medium">
                  {new Date(coupon.expiry).toLocaleDateString()}
                </span>
              </p>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-sm text-gray-500 italic">No coupons available at the moment.</p>
          )
        )}
      </div>
    </div>
  );
}