import React, { useState } from "react";
import AddressManager from "../../components/userCom/profileComponents/AddressManager";
import Navbar from "../../components/userCom/common/Navbar";

const tabs = [ "MANAGE ADDRESS"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("ADDRESS");

  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-4 md:p-8 bg-white">
      <div className="max-w-4xl mx-auto bg-white min-h-[650px]  p-4 md:p-8">
        

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
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
          
          {activeTab === "ADDRESS" && <AddressManager />}
         
        </div>
      </div>
    </div>
    </>
  );
}