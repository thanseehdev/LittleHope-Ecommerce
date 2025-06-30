import React from "react";
import AdminNavbar from "../../components/adminCom/common/Navbar";

const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
    { id: 3, name: "Carol Davis", email: "carol@example.com", role: "Viewer" },
    { id: 4, name: "David Lee", email: "david@example.com", role: "Editor" },
];

export default function UsersPage() {
    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Users Management</h1>

                {/* Table for medium+ screens */}
                <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map(({ id, name, email, role }) => (
                                <tr key={id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleBlockUser(order.customer)}
                                            className="mt-1 text-red-600 hover:underline focus:outline-none"
                                        >
                                            Block
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cards for small screens */}
                <div className="md:hidden space-y-4">
                    {users.map(({ id, name, email, role }) => (
                        <div
                            key={id}
                            className="bg-white p-4 rounded-lg shadow space-y-2"
                        >
                            <div>
                                <p className="text-lg font-semibold text-gray-900">{name}</p>
                                <p className="text-sm text-gray-500">{email}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-700">Role: {role}</p>
                            <div className="flex space-x-4">
                                <button className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
