import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupon } from "../../redux/features/admin/adminCoupon/couponAction";
import { PlusIcon } from "@heroicons/react/24/solid";
import AdminNavbar from "../../components/adminCom/common/Navbar";
import { Link } from "react-router-dom";

export default function CouponAdminPage() {
  const dispatch = useDispatch();

  const { coupons = [], loading, error } = useSelector((state) => state.coupons);

  console.log(coupons);
  
  useEffect(() => {
    dispatch(fetchCoupon());
  }, [dispatch]);

  return (
    <>
      <AdminNavbar />
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">
            Coupon Management
          </h1>
          <Link to='/admin/addCoupon'>
          <button
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            Add New Coupon
          </button>
          </Link>
        </div>

        {/* Error and Loading States */}
        {loading && <p className="text-center text-gray-600">Loading coupons...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Coupons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons?.length > 0 ? (
            coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="bg-white border border-gray-400 rounded-md shadow p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-2">{coupon.code}</h2>
                  <p className="text-gray-600 text-lg mb-4">
                    Discount: <span className="font-medium text-gray-800">₹{coupon.discount}</span>
                  </p>
                  <p className="text-gray-500">
                    Expires on:{" "}
                    <time dateTime={coupon.expiry} className="font-medium">
  {new Date(coupon.expiry).toLocaleDateString("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric"
})}
</time>

                  </p>
                </div>
                {/* Optionally implement delete later */}
              </div>
            ))
          ) : (
            !loading && (
              <p className="text-center text-gray-500 mt-16 text-lg col-span-full">
                No coupons available. Click "Add New Coupon" to create one.
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
}


