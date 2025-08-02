import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoupon } from "../../redux/features/user/profile/profileAction";
import Navbar from "../../components/userCom/common/Navbar";

const CouponCard = ({ amount, code, expiry }) => {
  const isExpired = new Date(expiry) < new Date();
  const formattedExpiry = new Date(expiry).toLocaleDateString();

  return (
    <div className="relative flex lg:w-[1500px] w-full max-w-3xl  border border-gray-200 overflow-hidden mb-6 bg-white transition-transform transform hover:shadow-md">
      
      {/* Expired Overlay */}
      {isExpired && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <span className="text-white lg:text-xl text-xs font-bold">Offer Ended!</span>
        </div>
      )}

      {/* Left: Discount Amount */}
      <div className="relative  bg-gradient-to-br from-red-400 to-pink-700 p-5 text-center text-white flex flex-col items-center justify-center zigzag-clip">
        <p className="lg:text-3xl text-2xl font-extrabold">₹{amount}</p>
        <p className="lg:text-base text-sm font-medium mt-1">OFF</p>
      </div>

      {/* Right: Coupon Details */}
      <div className="flex-1 p-7 flex flex-col justify-center item-center">
        <div>
          <p className="lg:text-base text-xs font-bold text-gray-800">
            Use code:{" "}
            <span className="inline-block shadow-inner bg-gray-100 p-2 lg:w-[200px] w-[160px] lg:text-2xl text-xl text-blue-600">
              {code}
            </span>
          </p>
          <p className="lg:text-sm text-xs text-gray-500 mt-2">
            Expires on: {formattedExpiry}
          </p>
        </div>
      </div>
    </div>
  );
};


// Main Component
const CouponPage = () => {
  const dispatch = useDispatch();
  const { coupons = [], loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCoupon());
  }, [dispatch]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50  flex flex-col items-center justify-start lg:py-10 py-5 px-4">
      <h1 className="lg:text-3xl text-xl font-semibold text-gray-700 mb-8">🏷️ Available Coupons</h1>

      {loading && <p>Loading coupons...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && coupons.length === 0 && <p>No coupons available.</p>}

      {coupons.map((coupon, index) => (
        <CouponCard
          key={index}
          amount={coupon.discount}
          code={coupon.code}
          expiry={coupon.expiry}
        />
      ))}
    </div>
    </>
  );
};

export default CouponPage;



