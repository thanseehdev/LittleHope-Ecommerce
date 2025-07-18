import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../redux/features/user/profile/profileAction";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const { profileUser: user, loading, error } = useSelector((state) => state.profile);

  const getInitial = (name = "") => name?.charAt(0)?.toUpperCase() || "?";
  const getBgColor = (name = "") => "bg-pink-600";

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4 justify-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getBgColor(user.name)}`}>
          {getInitial(user.name)}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          value={user.name || ""}
          disabled
          className="mt-1 w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          value={user.email || ""}
          disabled
          className="mt-1 w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">
        Update Profile
      </button>
    </form>
  );
}





