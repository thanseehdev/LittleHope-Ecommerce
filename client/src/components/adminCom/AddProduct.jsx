import React, { useState, useEffect } from "react";
import AdminNavbar from "./common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/features/admin/adminProduct/adminProductAction";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    size: "",
    gender: "",
    stock: "",
    images: [null, null, null, null, null], // 5 images slots
  });

  const [imagePreviews, setImagePreviews] = useState([null, null, null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0] || null;
    setProduct((prev) => {
      const newImages = [...prev.images];
      newImages[index] = file;
      return { ...prev, images: newImages };
    });

    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      if (file) {
        newPreviews[index] = URL.createObjectURL(file);
      } else {
        // If file removed
        if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]);
        newPreviews[index] = null;
      }
      return newPreviews;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviews]);

  const dispatch = useDispatch();
  const { loading, error, product: createdProduct } = useSelector((state) => state.product);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discountPrice", product.discountPrice)
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    formData.append("size", product.size); // Send as comma-separated string
    formData.append("gender", product.gender);

    product.images.forEach((file) => {
      if (file) formData.append("images", file);
    });

    dispatch(createProduct(formData));
  };
  useEffect(() => {
    if (createdProduct) {
      setProduct({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        category: "",
        size: "",
        gender: "",
        stock: "",
        images: [null, null, null, null, null],
      });
      setImagePreviews([null, null, null, null, null]);
    }
  }, [createdProduct]);



  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center px-4 py-8 sm:px-8 sm:py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl max-w-4xl w-full p-6 sm:p-10 border border-gray-200"
          encType="multipart/form-data"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8">
            Add Product
          </h2>
          {loading && <p className="text-blue-500">Creating product...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {createdProduct && <p className="text-green-600">Product created successfully!</p>}



          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Product Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Description
                </span>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Write a short product description"
                  required
                  rows="6"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 resize-none
                    focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Stock Quantity
                </span>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g. 50"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Gender
                </span>
                <select
                  name="gender"
                  value={product.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                    focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                >
                  <option value="" disabled>
                    Select genderCategory
                  </option>
                  <option>boys</option>
                  <option>girls</option>
                  <option>unisex</option>
                </select>
              </label>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Price ($)
                </span>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  placeholder="e.g. 29.99"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">
                  discountPrice ($)
                </span>
                <input
                  type="number"
                  name="discountPrice"
                  value={product.discountPrice}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  placeholder="e.g. 25.99"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Category
                </span>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                    focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option>Casual Dress</option>
                  <option>Party Dress</option>
                  <option>Summer Dress</option>
                  <option>Winter Dress</option>
                  <option>School Uniform</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">
                  Size
                </span>
                <select
                  name="size"
                  value={product.size}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
                    focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                >
                  <option value="" disabled>
                    Select size
                  </option>
                  <option>XS (2-3 yrs)</option>
                  <option>S (4-5 yrs)</option>
                  <option>M (6-7 yrs)</option>
                  <option>L (8-9 yrs)</option>
                  <option>XL (10-11 yrs)</option>
                </select>
              </label>

              <div>
                <span className="text-gray-700 font-semibold mb-2 block">
                  Upload up to 5 Images
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <label
                        htmlFor={`file-input-${idx}`}
                        className="cursor-pointer text-white text-center font-semibold mb-2 flex items-center justify-center border-2 bg-blue-500   rounded w-30 h-10 hover:bg-blue-600"
                      >
                        <span className="text-xs">Choose Image</span>
                      </label>
                      <input
                        id={`file-input-${idx}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, idx)} // Pass idx to handleImageChange
                        className="opacity-0 absolute w-0 h-0"
                      />
                      {imagePreviews[idx] ? (
                        <img
                          src={imagePreviews[idx]}
                          alt={`Preview ${idx + 1}`}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-300 shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                          <span className="text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md
              focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}



