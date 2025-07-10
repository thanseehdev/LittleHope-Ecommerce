import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {getCoupon} from '../../../redux/features/user/profile/profileAction'

export default function Coupons() {
  const dispatch=useDispatch()
  const {coupons=[],loading,error}=useSelector((state)=>state.profile)
  useEffect(()=>{
    dispatch(getCoupon())
  },[dispatch])
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Available Coupons</h2>

      {loading && <p>Loading coupons...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {coupons.length > 0 ? (
        coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="border p-4 mb-2 rounded text-sm text-gray-700 bg-yellow-50"
          >🎁 Use code <strong>{coupon.code}</strong> to get ₹{coupon.discount} off!
            <div className="text-xs text-gray-600">
              Expires on {new Date(coupon.expiry).toLocaleDateString()}
            </div>
          </div>
        ))
      ) : (
        !loading && <p>No coupons available.</p>
      )}
    </div>
  );
}
