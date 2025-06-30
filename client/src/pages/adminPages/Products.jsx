import React, { useState } from "react";
import AdminNavbar from "../../components/adminCom/common/Navbar";

export default function AdminProductPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      stock: 10,
      image: "https://via.placeholder.com/60x60.png?text=Prod+1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      stock: 5,
      image: "https://via.placeholder.com/60x60.png?text=Prod+2",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: `New Product ${products.length + 1}`,
      price: 9.99,
      stock: 0,
      image: "https://via.placeholder.com/60x60.png?text=New",
    };
    setProducts([...products, newProduct]);
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProducts((prev) =>
      prev.map((p) => (p.id === editProduct.id ? editProduct : p))
    );
    setIsEditing(false);
    setEditProduct(null);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditProduct(null);
  };

  return (
    <>
    <AdminNavbar/>
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3 sm:mb-0">
          Admin Product Page
        </h1>
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price ($)</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{product.id}</td>
                <td className="px-4 py-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                <td className="px-4 py-3 text-sm text-gray-900">${product.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{product.stock}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEditClick(product)}
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

      {/* Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  name="name"
                  type="text"
                  value={editProduct.name}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  name="image"
                  type="text"
                  value={editProduct.image}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  value={editProduct.price}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  name="stock"
                  type="number"
                  value={editProduct.stock}
                  onChange={handleEditChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}


