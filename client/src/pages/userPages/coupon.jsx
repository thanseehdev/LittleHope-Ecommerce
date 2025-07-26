import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupon } from "../../redux/features/user/profile/profileAction";
import Navbar from "../../components/userCom/common/Navbar";

// Coupon Card Component - purely presentational
const CouponCard = ({ amount, code, expiry }) => (
  <div className="flex lg:w-[1500px] w-full max-w-3xl rounded-l-md border-gray-300  overflow-hidden shadow mb-6 bg-white transition-transform transform hover:shadow-md">
    {/* Left: Discount Amount */}
   <div className="relative w-[120px] h-[120px] bg-gradient-to-br from-red-400 to-pink-700 p-5 text-center text-white flex flex-col items-center justify-center zigzag-clip">
  <p className="lg:text-3xl text-2xl font-extrabold">₹{amount}</p>
  <p className="lg:text-base text-sm font-medium mt-1">OFF</p>
</div>


    {/* Right: Coupon Details */}
    <div className="flex-1 p-7  flex flex-col justify-center item-center">
       <div>
      <p className="lg:text-base text-xs font-bold text-gray-800">
  Use code: <span className="inline-block bg-gray-100 p-2 lg:w-[200px]  w-[160px] lg:text-2xl text-xl text-blue-600">{code}</span>
</p>

        <p className="lg:text-sm text-xs text-gray-500 mt-2">Expires on: {expiry}</p>
      </div>
    </div>
  </div>
);

// Main Component
const UserCoupon = () => {
  const dispatch = useDispatch();
  const { coupons = [], loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-start lg:py-10 py-5 px-4">
      <h1 className="lg:text-3xl text-xl font-semibold text-gray-700 mb-8">🏷️ Available Coupons</h1>

      {loading && <p>Loading coupons...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && coupons.length === 0 && <p>No coupons available.</p>}

      {coupons.map((coupon, index) => (
        <CouponCard
          key={index}
          amount={coupon.discount}
          code={coupon.code}
          expiry={new Date(coupon.expiry).toLocaleDateString()}
        />
      ))}
    </div>
    </>
  );
};

export default UserCoupon;



