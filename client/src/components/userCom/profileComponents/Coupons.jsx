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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🎉 Available Coupons</h2>

      {loading && (
        <div className="text-gray-600 animate-pulse">Loading coupons...</div>
      )}

      {error && (
        <div className="flex items-center text-red-600 mb-4">
          <FiAlertCircle className="mr-2" />
          <span>Error: {error}</span>
        </div>
      )}

      <div className="grid gap-4">
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="border border-yellow-300 bg-yellow-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-2">
                <FiGift className="text-yellow-600 mr-2 text-xl" />
                <span className="text-lg font-semibold text-gray-800">
                  ₹{coupon.discount} OFF
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-1">
                Use code: <span className="font-mono font-bold text-blue-700">{coupon.code}</span>
              </p>

              <p className="text-xs text-gray-600">
                Expires on{" "}
                <span className="font-medium">
                  {new Date(coupon.expiry).toLocaleDateString()}
                </span>
              </p>
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


