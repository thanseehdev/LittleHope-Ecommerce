import React, { useEffect } from "react";
import AdminNavbar from "../../components/adminCom/common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser, blockUser} from "../../redux/features/admin/adminUser/adminUserAction";

export default function adminUsers() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.adminUsers);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleBlockUser = (id) => {
        dispatch(blockUser(id));
    };

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
    };

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Users Management</h1>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map(({ _id, name, email, role, isBlocked }) => (
                                <tr key={_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{name}</td>
                                    <td className="px-6 py-4">{email}</td>
                                    <td className="px-6 py-4">{role}</td>
                                    <td className="px-6 py-4 space-x-4">
                                        <button onClick={() => handleBlockUser(_id)} className="text-red-600 hover:underline">
                                            {isBlocked ? "Blocked" : "Block"}
                                        </button>
                                        <button onClick={() => handleDeleteUser(_id)} className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

