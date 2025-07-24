import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import SortBar from "./SortBar";
import Navbar from "../../common/Navbar";
import { FunnelIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../../../redux/features/user/product/allProductAction";
import { useMemo } from "react";

const ProductGrid = () => {
  const dispatch = useDispatch();
  const { items: allProducts, loading, error } = useSelector(
    (state) => state.allProducts
  );

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("");
  const [cart, setCart] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

const filteredProducts = useMemo(() => {
  if (!Array.isArray(allProducts) || allProducts.length === 0) return [];

  return allProducts
    .filter(
      (p) =>
        p.price != null &&
        !isNaN(p.price) &&
        (selectedCategory.length === 0 || selectedCategory.includes(p.category)) &&
        (selectedGender.length === 0 || selectedGender.includes(p.gender)) &&
        Number(p.discountPrice) >= minPrice &&
        Number(p.discountPrice) <= maxPrice
    )
    .sort((a, b) => {
      const priceA = Number(a.discountPrice);
      const priceB = Number(b.discountPrice);

      if (sortBy === "priceLow") return priceA - priceB;
      if (sortBy === "priceHigh") return priceB - priceA;

      return 0;
    });
}, [allProducts, selectedCategory, selectedGender, minPrice, maxPrice, sortBy]);


  return (
    <>
      <Navbar />

      <div className="flex flex-col sm:flex-row gap-4 px-3 py-2 bg-gray-50 min-h-screen">
        {/* Mobile Filter/Sort Buttons */}
        <div className="block sm:hidden w-full sticky top-14 z-40 bg-gray-50">
          <div className="flex justify-between w-full">
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="w-1/2 bg-gray-500 text-white p-2 border rounded-l-md hover:bg-pink-500 flex items-center justify-center gap-2"
            >
              <FunnelIcon className="w-5 h-5" />
              {isFilterOpen ? "Hide Filters" : "Filters"}
            </button>
            <button
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="w-1/2 bg-gray-500 text-white p-2 border rounded-r-md hover:bg-pink-500 flex items-center justify-center gap-2"
            >
              <ChevronUpDownIcon className="w-5 h-5" />
              {isSortOpen ? "Hide Sort" : "Sort"}
            </button>
          </div>
        </div>

        {/* Sticky Sidebar for desktop */}
        <div
          className={`sm:w-64 w-full bg-white rounded-lg shadow-md ${
            isFilterOpen ? "block" : "hidden sm:block"
          } sm:sticky sm:top-[72px] sm:h-fit sm:max-h-screen`}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        {/* Filter Modal for mobile */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 sm:hidden">
            <div className="bg-white w-full p-4 max-h-[80vh] overflow-y-auto rounded shadow-md mt-20 mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Close
                </button>
              </div>
              <Sidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
            </div>
          </div>
        )}

        {/* Sort Modal for mobile */}
        {isSortOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 sm:hidden">
            <div className="bg-white w-full p-4 max-h-[80vh] overflow-y-auto rounded shadow-md mt-20 mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Sort Options</h2>
                <button
                  onClick={() => setIsSortOpen(false)}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Close
                </button>
              </div>
              <SortBar sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {/* Sticky SortBar for desktop */}
          <div className="hidden sm:block sticky top-[72px] z-30 ">
            <SortBar sortBy={sortBy} setSortBy={setSortBy} />
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No products found.</p>
          ) : (
            <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {filteredProducts.map((product, idx) => (
                <ProductCard product={product} key={idx} addToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;







