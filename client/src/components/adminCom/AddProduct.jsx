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
    sizeAndStock: [], // Updated
    gender: "",
    images: [null, null, null, null, null],
  });

  const [imagePreviews, setImagePreviews] = useState([null, null, null, null, null]);

  const dispatch = useDispatch();
  const { loading, error, product: createdProduct } = useSelector((state) => state.product);

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
        if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]);
        newPreviews[index] = null;
      }
      return newPreviews;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discountPrice", product.discountPrice);
    formData.append("category", product.category);
    formData.append("gender", product.gender);

    product.sizeAndStock.forEach(({ size, stock }) => {
      formData.append("sizeAndStock[]", JSON.stringify({ size, stock }));
    });

    product.images.forEach((file) => {
      if (file) formData.append("images", file);
    });

    dispatch(createProduct(formData));
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviews]);

  useEffect(() => {
    if (createdProduct) {
      setProduct({
        name: "",
        description: "",
        price: "",
        discountPrice: "",
        category: "",
        sizeAndStock: [],
        gender: "",
        images: [null, null, null, null, null],
      });
      setImagePreviews([null, null, null, null, null]);
    }
  }, [createdProduct]);

  const sizeOptions = ["2-3 y", "4-5 y", "6-7 y", "8-9 y", "10-11 y"];

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
            <div className="space-y-6">
              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Product Name</span>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Description</span>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows="6"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm resize-none"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Gender</span>
                <select
                  name="gender"
                  value={product.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="" disabled>Select Gender</option>
                  <option>Boys</option>
                  <option>Girls</option>
                  <option>Unisex</option>
                </select>
              </label>
            </div>

            <div className="space-y-6">
              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Price ($)</span>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  min="1"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Discount Price ($)</span>
                <input
                  type="number"
                  name="discountPrice"
                  value={product.discountPrice}
                  onChange={handleChange}
                  min="1"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Category</span>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="" disabled>Select Category</option>
                  <option>Casual Wear</option>
                  <option>Formal Wear</option>
                  <option>Combo Sets</option>
                  <option>Ethnic Wear</option>
                  <option>Sports Wear</option>
                  <option>Party Wear</option>
                </select>
              </label>
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="text-gray-700 font-semibold mb-2">Sizes & Stock</legend>
            {sizeOptions.map((sizeOption) => {
              const entry = product.sizeAndStock.find((s) => s.size === sizeOption) || {};
              return (
                <div key={sizeOption} className="flex items-center gap-4 mb-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!entry.size}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setProduct((prev) => {
                          let updated = [...prev.sizeAndStock];
                          if (checked) {
                            updated.push({ size: sizeOption, stock: 0 });
                          } else {
                            updated = updated.filter((s) => s.size !== sizeOption);
                          }
                          return { ...prev, sizeAndStock: updated };
                        });
                      }}
                    />
                    {sizeOption}
                  </label>
                  {entry.size && (
                    <input
                      type="number"
                      placeholder="Stock"
                      min="0"
                      value={entry.stock || ""}
                      onChange={(e) => {
                        const newStock = parseInt(e.target.value, 10);
                        setProduct((prev) => {
                          const updated = prev.sizeAndStock.map((s) =>
                            s.size === sizeOption ? { ...s, stock: isNaN(newStock) ? 0 : newStock } : s
                          );
                          return { ...prev, sizeAndStock: updated };
                        });
                      }}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  )}
                </div>
              );
            })}
          </fieldset>

          <div className="mt-6">
            <span className="text-gray-700 font-semibold mb-2 block">Upload up to 5 Images</span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[0, 1, 2, 3, 4].map((idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <label
                    htmlFor={`file-input-${idx}`}
                    className="cursor-pointer text-white bg-blue-500 hover:bg-blue-600 text-xs font-semibold py-2 px-3 rounded"
                  >
                    Choose Image
                  </label>
                  <input
                    id={`file-input-${idx}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, idx)}
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

          <button
            type="submit"
            className="mt-8 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}




