import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../redux/features/user/profile/profileAction";
import { FiZap } from "react-icons/fi";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const { profileUser: user, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <div className="bg-blue-50 rounded-xl p-6 max-w-md mx-auto shadow-sm border border-gray-200">
      
      {/* Welcome Note */}
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-800">
          Welcome, {user.name?.split(" ")[0] || "User"} 👋
        </h1>
        <p className="text-sm text-gray-500">We're glad to see you back!</p>
      </div>

      {/* User Info Row */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
       
      </div>

      {/* Explore Link */}
      
    </div>
  );
}





