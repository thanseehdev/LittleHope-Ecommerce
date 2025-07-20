import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import SortBar from "./SortBar";
import Navbar from "../../common/Navbar";
import { FunnelIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../../../../redux/features/user/product/allProductAction";

// Spinner shown only on mobile during filter/sort
const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ProductGrid = () => {
  const dispatch = useDispatch();
  const { items: allProducts, loading, error } = useSelector(
    (state) => state.allProducts
  );

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("");
  const [cart, setCart] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // Track screen width to show spinner on small screens only
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger spinner only on small screens when filter/sort changes
  useEffect(() => {
    if (!allProducts.length || screenWidth >= 640) return;

    setIsFiltering(true);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [
    selectedCategory,
    selectedGender,
    minPrice,
    maxPrice,
    sortBy,
    allProducts.length,
    screenWidth,
  ]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  const filteredProducts = allProducts
    .filter(
      (p) =>
        (selectedCategory.length === 0 || selectedCategory.includes(p.category)) &&
        (selectedGender.length === 0 || selectedGender.includes(p.gender)) &&
        p.price >= minPrice &&
        p.price <= maxPrice
    )
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-6 px-4 py-4 bg-gray-50 min-h-screen">
        {/* Mobile Filter/Sort Buttons */}
        <div className="block sm:hidden w-full sticky top-14 z-40 bg-gray-50">
          <div className="flex justify-between w-full">
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="w-1/2 bg-gray-500 text-white p-2 border rounded shadow hover:bg-pink-500 flex items-center justify-center gap-2"
            >
              <FunnelIcon className="w-5 h-5" />
              {isFilterOpen ? "Hide Filters" : "Filters"}
            </button>
            <button
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="w-1/2 bg-gray-500 text-white p-2 border rounded shadow hover:bg-pink-500 flex items-center justify-center gap-2"
            >
              <ChevronUpDownIcon className="w-5 h-5" />
              {isSortOpen ? "Hide Sort" : "Sort"}
            </button>
          </div>
        </div>

        {/* Sidebar for desktop */}
        <div
          className={`sm:w-64 w-full bg-white rounded-lg shadow-md ${
            isFilterOpen ? "block" : "hidden sm:block"
          }`}
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
          {/* SortBar for desktop */}
          <div className={`${isSortOpen ? "block" : "hidden sm:block"}`}>
            <SortBar sortBy={sortBy} setSortBy={setSortBy} />
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : isFiltering && screenWidth < 640 ? (
            <Spinner />
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
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




