import React, { useState } from "react";
import ProfileForm from "../../components/userCom/profileComponents/ProfileForm";
import AddressManager from "../../components/userCom/profileComponents/AddressManager";
import Coupons from "../../components/userCom/profileComponents/Coupons";
import Navbar from "../../components/userCom/common/Navbar";

const tabs = ["Profile", "Address", "Coupons | Offers"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-4 md:p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-4 md:p-8">
        <h1 className="text-xl font-bold mb-4">My Account</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm px-4 py-2 rounded-t ${
                activeTab === tab
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "Profile" && <ProfileForm />}
          {activeTab === "Address" && <AddressManager />}
          {activeTab === "Coupons | Offers" && <Coupons />}
        </div>
      </div>
    </div>
    </>
  );
}