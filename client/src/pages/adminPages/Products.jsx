import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/adminCom/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from '../../redux/features/admin/adminProduct/adminProductAction'

export default function AdminProductPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const limit = 10
  const { products = [], loading, error, totalPages } = useSelector(state => state.product)
  useEffect(() => {
    dispatch(fetchAllProducts({ page, limit }))
  }, [dispatch, page])
  const handleEditClick = (id) => {
    navigate(`/admin/editProduct/${id}`)
  }
  const handleAddProduct = () => {
    navigate('/admin/addProduct')
  }

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };


  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3 sm:mb-0">
            Admin Product Page
          </h1>
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && Array.isArray(products) && products.length === 0 && <p>No products found.</p>}


          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </header>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price (₹)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{product._id}</td>
                  <td className="px-4 py-3">
                    <img src={product.images[0]} alt={product.name} className="w-12 h-12  rounded" />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">₹{product.discountPrice}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.sizeAndStock?.reduce((acc, item) => acc + item.stock, 0)}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEditClick(product._id)}
                      className="text-sm bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
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


