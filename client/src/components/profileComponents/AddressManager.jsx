import React, { useState } from "react";

export default function AddressManager() {
  const [addresses, setAddresses] = useState([
    { id: 1, name: "John Doe", street: "123 Main St", city: "New York", zip: "10001" },
  ]);

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.zip) return;

    const newEntry = {
      ...newAddress,
      id: Date.now(),
    };
    setAddresses((prev) => [...prev, newEntry]);
    setNewAddress({ name: "", street: "", city: "", zip: "" });
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>

      {addresses.length === 0 ? (
        <p className="text-gray-600">No addresses added yet.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {addresses.map((address) => (
            <li key={address.id} className="border p-4 rounded">
              <p className="font-semibold">{address.name}</p>
              <p>{address.street}, {address.city}, {address.zip}</p>
              <button
                className="text-sm text-red-500 mt-2"
                onClick={() => handleDelete(address.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Add New Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            value={newAddress.name}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Full Name"
          />
          <input
            name="street"
            value={newAddress.street}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Street Address"
          />
          <input
            name="city"
            value={newAddress.city}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="City"
          />
          <input
            name="zip"
            value={newAddress.zip}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="ZIP Code"
          />
        </div>
        <button
          onClick={handleAddAddress}
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded"
        >
          Add Address
        </button>
      </div>
    </div>
  );
}

