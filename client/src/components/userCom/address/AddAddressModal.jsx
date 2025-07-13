import React, { useState } from "react";

export default function AddAddressModal({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        fullName: "",
        landmark: "",
        city: "",
        zipCode: "",
        mobileNo: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Add New Address
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <Input
                        name="landmark"
                        placeholder="Landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                    />
                    <Input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <Input
                        name="zipCode"
                        placeholder="Zip Code"
                        value={formData.zipCode}
                        onChange={handleChange}
                        pattern="[1-9][0-9]{5}"
                    />
                    <Input
                        name="mobileNo"
                        placeholder="Mobile Number"
                        value={formData.mobileNo}
                        onChange={handleChange}
                    />
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Input({ name, placeholder, value, onChange, pattern }) {
    return (
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            pattern={pattern}
            className="w-full px-4 py-2 border  rounded-md focus:outline-none focus:border-pink-500 transition"
        />
    );
}

