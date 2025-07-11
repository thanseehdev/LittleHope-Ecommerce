import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdminNavbar from "./common/Navbar";
import {getEditProduct} from "../../redux/features/admin/adminProduct/adminProductAction";

export default function EditProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.product);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    size: [],
    gender: "",
    stock: "",
    images: [null, null, null, null, null],
  });

  const [imagePreviews, setImagePreviews] = useState([null, null, null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSizes = ["2-3 y", "4-5 y", "6-7 y", "8-9 y", "10-11 y"];

  useEffect(() => {
    if (id) dispatch(getEditProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setProductForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        discountPrice: product.discountPrice || "",
        category: product.category || "",
        size: product.size || [],
        gender: product.gender || "",
        stock: product.stock || "",
        images: product.images || [null, null, null, null, null],
      });

      setImagePreviews(
        (product.images || []).map((img) =>
          typeof img === "string"
            ? img
            : img
            ? URL.createObjectURL(img)
            : null
        )
      );
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0] || null;
    setProductForm((prev) => {
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

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url && typeof url === "string" && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imagePreviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedImages = productForm.images.filter(Boolean); // Remove empty/null images
    const productData = {
      ...productForm,
      images: updatedImages,
    };

    //await dispatch(updateProduct({ id, productData }));

    setIsSubmitting(false);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

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
            Edit Product
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Product Name</span>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Description</span>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleChange}
                  rows="6"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm resize-none"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Stock Quantity</span>
                <input
                  type="number"
                  name="stock"
                  value={productForm.stock}
                  onChange={handleChange}
                  min="0"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Gender</span>
                <select
                  name="gender"
                  value={productForm.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="" disabled>Select gender category</option>
                  <option>Boys</option>
                  <option>Girls</option>
                  <option>Unisex</option>
                </select>
              </label>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Price ($)</span>
                <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Discount Price ($)</span>
                <input
                  type="number"
                  name="discountPrice"
                  value={productForm.discountPrice}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Category</span>
                <select
                  name="category"
                  value={productForm.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
                >
                  <option value="" disabled>Select category</option>
                  <option>Casual Dress</option>
                  <option>Party Dress</option>
                  <option>Summer Dress</option>
                  <option>Winter Dress</option>
                  <option>School Uniform</option>
                </select>
              </label>

              <fieldset className="space-y-2">
                <legend className="text-gray-700 font-semibold mb-1">Size</legend>
                {availableSizes.map((sizeOption) => (
                  <label key={sizeOption} className="block">
                    <input
                      type="checkbox"
                      value={sizeOption}
                      checked={productForm.size.includes(sizeOption)}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        setProductForm((prev) => {
                          const updatedSizes = checked
                            ? [...prev.size, value]
                            : prev.size.filter((s) => s !== value);
                          return { ...prev, size: updatedSizes };
                        });
                      }}
                      className="mr-2"
                    />
                    {sizeOption}
                  </label>
                ))}
              </fieldset>

              {/* Image Uploads */}
              <div>
                <span className="text-gray-700 font-semibold mb-2 block">Upload up to 5 Images</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <label
                        htmlFor={`file-input-${idx}`}
                        className="cursor-pointer text-white text-center font-semibold mb-2 flex items-center justify-center border-2 bg-blue-500 rounded w-30 h-10 hover:bg-blue-600"
                      >
                        <span className="text-xs">Choose Image</span>
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
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </>
  );
}


