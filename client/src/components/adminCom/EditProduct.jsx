import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "./common/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getEditProduct, updateProduct } from "../../redux/features/admin/adminProduct/adminProductAction";

const sizeOptions = ["2-3 y", "4-5 y", "6-7 y", "8-9 y", "10-11 y"];

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product: productDetails, loading, error, updateSuccess } = useSelector((state) => state.product);

  // Initialize sizeAndStock as array of {size, stock} objects
  const [sizeAndStock, setSizeAndStock] = useState(
    sizeOptions.map((size) => ({ size, stock: 0 }))
  );

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    gender: "",
    images: [null, null, null, null, null],
  });

  const [imagePreviews, setImagePreviews] = useState([null, null, null, null, null]);

  useEffect(() => {
    dispatch(getEditProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (productDetails && productDetails._id === id) {
      // Map productDetails.sizeAndStock to match local state format, fill in defaults if missing
      const updatedSizeAndStock = sizeOptions.map((size) => {
        const found = productDetails.sizeAndStock?.find((item) => item.size === size);
        return {
          size,
          stock: found ? found.stock : 0,
        };
      });

      const previews = [null, null, null, null, null];
      productDetails.images?.forEach((img, i) => {
        previews[i] = img;
      });

      setProduct({
        name: productDetails.name || "",
        description: productDetails.description || "",
        price: productDetails.price || "",
        discountPrice: productDetails.discountPrice || "",
        category: productDetails.category || "",
        gender: productDetails.gender || "",
        images: [null, null, null, null, null], // files input cleared initially
      });

      setSizeAndStock(updatedSizeAndStock);
      setImagePreviews(previews);
    }
  }, [productDetails, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle stock change for a specific size
  const handleStockChange = (index, value) => {
    const val = Math.max(0, parseInt(value) || 0);
    setSizeAndStock((prev) => {
      const updated = [...prev];
      updated[index].stock = val;
      return updated;
    });
  };

  // Handle checkbox toggle for size (if unchecked, stock reset to 0)
  const handleSizeToggle = (index, checked) => {
    setSizeAndStock((prev) => {
      const updated = [...prev];
      if (!checked) {
        updated[index].stock = 0; // reset stock if unchecked
      } else if (updated[index].stock === 0) {
        updated[index].stock = 1; // default stock if checked with 0 stock
      }
      return updated;
    });
  };

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

 const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("discountPrice", product.discountPrice);
  formData.append("category", product.category);
  formData.append("gender", product.gender);

  // Append sizeAndStock as JSON string
  formData.append("sizeAndStock", JSON.stringify(sizeAndStock));

  // Append only new image files (non-null)
  product.images.forEach((file) => {
    if (file) {
      formData.append("images", file);
    }
  });

  dispatch(updateProduct({ id: productDetails._id, formData }));
};



  useEffect(() => {
    if (updateSuccess) {
      navigate("/admin/product");
    }
  }, [updateSuccess, navigate]);

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
          {loading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {updateSuccess && <p className="text-green-600">Product updated successfully!</p>}

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
                  className="input"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Description</span>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="input"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Gender</span>
                <select
                  name="gender"
                  value={product.gender}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select</option>
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
                  step="0.01"
                  required
                  className="input"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Discount Price ($)</span>
                <input
                  type="number"
                  name="discountPrice"
                  value={product.discountPrice}
                  onChange={handleChange}
                  step="0.01"
                  required
                  className="input"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-semibold mb-1 block">Category</span>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">Select</option>
                  <option>Casual Wear</option>
                  <option>Formal Wear</option>
                  <option>Combo Sets</option>
                  <option>Ethnic Wear</option>
                  <option>Sports Wear</option>
                  <option>Party Wear</option>
                </select>
              </label>

              {/* Size & Stock inputs */}
              <fieldset className="space-y-2">
                <legend className="text-gray-700 font-semibold mb-1">Size & Stock</legend>
                {sizeAndStock.map(({ size, stock }, idx) => (
                  <div key={size} className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={stock > 0}
                      onChange={(e) => handleSizeToggle(idx, e.target.checked)}
                      className="mr-2"
                    />
                    <span className="w-24">{size}</span>
                    <input
                      type="number"
                      min="0"
                      value={stock}
                      onChange={(e) => handleStockChange(idx, e.target.value)}
                      disabled={stock === 0}
                      className="input w-20"
                    />
                  </div>
                ))}
              </fieldset>

              <div>
                <span className="text-gray-700 font-semibold mb-2 block">
                  Images (replace only if needed)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <label
                        htmlFor={`edit-file-${idx}`}
                        className="cursor-pointer text-white text-center font-semibold mb-2 flex items-center justify-center border-2 bg-blue-500 rounded w-30 h-10 hover:bg-blue-600"
                      >
                        <span className="text-xs">Choose Image</span>
                      </label>
                      <input
                        id={`edit-file-${idx}`}
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
            className="mt-8 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-purple-400 transition duration-300"
          >
            Update Product
          </button>
        </form>
      </div>
    </>
  );
}


