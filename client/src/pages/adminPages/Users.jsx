import React, { useState, useEffect } from "react";
import AdminNavbar from "../../components/adminCom/common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser, blockUser, unblockUser } from "../../redux/features/admin/adminUser/adminUserAction";

export default function adminUsers() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const limit = 10
    const { users, loading, error, totalPages } = useSelector(state => state.adminUsers);

    useEffect(() => {
        dispatch(fetchAllUsers({ page, limit }))
    }, [dispatch, page])


    const handleBlockUser = (id) => {
        dispatch(blockUser(id));
    };
    const handleUnBlockUser = (id) => {
        dispatch(unblockUser(id));
    };

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
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
                                        {isBlocked ? (
                                            <button onClick={() => handleUnBlockUser(_id)} className="text-green-600 hover:underline">
                                                Unblock
                                            </button>
                                        ) : (
                                            <button onClick={() => handleBlockUser(_id)} className="text-red-600 hover:underline">
                                                Block
                                            </button>
                                        )}
                                        <button onClick={() => handleDeleteUser(_id)} className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (
                    <div className="flex justify-center items-center flex-wrap gap-4 mt-10 px-4 sm:px-0">

                        <button
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className="lg:text-base text-xs px-5 py-3 rounded-xl bg-gray-100 text-gray-700 shadow-neumorph
             disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
             hover:shadow-neumorph-hover focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        >prev</button>

                        <span className="lg:text-base text-xs px-4 py-2">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={page === totalPages}
                            className="lg:text-base text-xs px-5 py-3 rounded-xl bg-gray-100 text-gray-700 shadow-neumorph
             disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
             hover:shadow-neumorph-hover focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

