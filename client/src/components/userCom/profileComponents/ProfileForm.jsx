import React, { useState } from "react";

export default function ProfileForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, profilePic: URL.createObjectURL(file) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={form.profilePic || "https://via.placeholder.com/80"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <input type="file" onChange={handleImageChange} />
      </div>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded">
        Update Profile
      </button>
    </form>
  );
}
