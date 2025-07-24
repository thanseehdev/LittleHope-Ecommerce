import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, getAddress, deleteAddress } from '../../../redux/features/user/profile/profileAction'

export default function AddressManager() {
  const dispatch = useDispatch();
  const { addresses = [], loading, error } = useSelector((state) => state.profile || {});


  const [newAddress, setNewAddress] = useState({
    name: "",
    landmark: "",
    city: "",
    zip: "",
    mobile: "",
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getAddress());  // Fetch addresses when the component mounts
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async () => {
    if (!newAddress.name || !newAddress.landmark || !newAddress.city || !newAddress.zip || !newAddress.mobile) {
      alert("Please fill in all fields.");
      return;
    }

    await dispatch(addAddress(newAddress));  // wait for add to complete
    dispatch(getAddress());  // refetch updated address list
    setNewAddress({ name: "", landmark: "", city: "", zip: "", mobile: "" });
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteAddress(id)); // wait for delete to complete
    dispatch(getAddress());             // refetch updated address list
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>

      {loading ? (
        <p className="text-gray-600">Loading addresses...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : addresses.length === 0 ? (
        <p className="text-gray-600">No addresses added yet.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {addresses.map((address) => (
            <li key={address._id} className="border p-4 rounded">
              <div className="flex items-center lg:text-base text-sm font-semibold text-gray-800 mb-2 space-x-2">
        <span>{address.fullName}</span>
        <span className="text-gray-400">|</span>
        <span>{address.mobileNo}</span>
      </div>
      <div className="lg:text-base text-sm text-gray-700 leading-relaxed">
        {address.landmark}<br />
        {address.city} - {address.zipCode}
      </div>
              <button
                className="text-sm text-red-500 mt-2"
                onClick={() => handleDelete(address._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mt-4 bg-pink-600 text-white px-4 py-2 rounded"
      >
        {showForm ? "Cancel" : "Add New Address"}
      </button>

      {showForm && (
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
              name="landmark"
              value={newAddress.landmark}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Landmark Address"
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
            <input
              name="mobile"
              value={newAddress.mobile}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Mobile Number"
            />
          </div>
          <button
            onClick={handleAddAddress}
            className="mt-4 bg-pink-600 text-white px-4 py-2 rounded"
          >
            Add Address
          </button>
        </div>
      )}
    </div>
  );
}




