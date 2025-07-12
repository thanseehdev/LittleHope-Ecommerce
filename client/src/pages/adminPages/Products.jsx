import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/adminCom/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchAllProducts} from '../../redux/features/admin/adminProduct/adminProductAction'

export default function AdminProductPage() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {products=[],loading,error}=useSelector(state=>state.product)
useEffect(()=>{
dispatch(fetchAllProducts())
},[dispatch])
  const handleEditClick = (id) => {
    navigate(`/admin/editProduct/${id}`)
  }
  const handleAddProduct=()=>{
    navigate('/admin/addProduct')
  }

  return (
    <>
    <AdminNavbar/>
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
                <td className="px-4 py-3 text-sm text-gray-900">{product.stock}</td>
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
    </div>
    </>
  );
}


