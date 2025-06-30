import React, { useState } from "react";
import AddressCard from "../../components/userCom/address/AddressCard";
import Navbar from "../../components/userCom/common/Navbar.jsx";


export default function AddressPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Thanseeh",
      tag: "home",
      details: "Kovukunnu, near kovukunn LP SCHOOL, Mokeri, Kovukunn, Kozhikode, Kerala - 673507",
      phone: "9074827805",
      cod: true,
    },
    {
      id: 2,
      name: "Thanseeh",
      tag: "office",
      details: "Mikro Grafeio (Beyond Workspaces), Near 4th Railway Gate, Thervved, Kozhikode, Kerala - 673032",
      phone: "9074827805",
      cod: false,
    },
  ]);

  const [selectedId, setSelectedId] = useState(1);

  const handleSelect = (id) => setSelectedId(id);
  const handleEdit = (id) => alert("Edit address " + id);
  const handleRemove = (id) => alert("Remove address " + id);

  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>

      <div>
        <h3 className="text-lg font-medium mb-2">DEFAULT ADDRESS</h3>
        <AddressCard
          address={addresses[0]}
          isSelected={selectedId === addresses[0].id}
          onSelect={() => handleSelect(addresses[0].id)}
          onEdit={() => handleEdit(addresses[0].id)}
          onRemove={() => handleRemove(addresses[0].id)}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2 mt-6">OTHER ADDRESS</h3>
        {addresses.slice(1).map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            isSelected={selectedId === address.id}
            onSelect={() => handleSelect(address.id)}
            onEdit={() => handleEdit(address.id)}
            onRemove={() => handleRemove(address.id)}
          />
        ))}
      </div>

      <button className="text-pink-600 mt-4 font-medium">+ Add New Address</button>

      <div className="mt-10 border-t pt-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
        <div className="text-sm text-gray-600 mb-4 sm:mb-0">
          <p>Estimated delivery by <span className="font-semibold text-black">30 Jun 2025</span></p>
          <p>MRP: ₹1499 <br />Discount: -₹900 <br />Platform Fee: ₹20</p>
          <p className="font-semibold mt-1">Total: ₹619</p>
        </div>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md">
          CONTINUE
        </button>
      </div>
    </div>
    </>
  );
}
