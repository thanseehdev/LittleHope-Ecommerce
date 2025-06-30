import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import SortBar from "./SortBar";
import Navbar from "../../common/Navbar";
import { FunnelIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

const allProducts = [
  {
    brand: "RARE RABBIT",
    name: "Men Brand Logo Printed T-shirt",
    price: 2108,
    originalPrice: 3699,
    discount: "43% OFF",
    image: "/productsImg/allProducts-img/productF-6b-img.jpg"
  },
  {
    brand: "Tommy Hilfiger",
    name: "Men Cotton Polo Collar T-shirt",
    price: 3035,
    originalPrice: 4599,
    discount: "34% OFF",
    image: "/productsImg/allProducts-img/productF-7a-img.jpg"
  },
  {
    brand: "Roadster",
    name: "Solid Polo Collar T-shirt",
    price: 299,
    originalPrice: 999,
    discount: "70% OFF",
    image: "/productsImg/allProducts-img/productF-1a-img.jpg"
  },
  {
    brand: "Campus Sutra",
    name: "Men Solid Cotton Polo T-shirt",
    price: 662,
    originalPrice: 1699,
    discount: "61% OFF",
    image: "/productsImg/allProducts-img/productF-2a-img.jpg"
  },
  {
    brand: "Tommy Hilfiger",
    name: "Men Printed Cotton T-shirt",
    price: 2239,
    originalPrice: 2799,
    discount: "20% OFF",
    image: "/productsImg/allProducts-img/productF-3a-img.jpg"
  },
   {
    brand: "Peter England",
    name: "Men Printed Cotton T-shirt",
    price: 1000,
    originalPrice: 1600,
    discount: "20% OFF",
    image: "/productsImg/allProducts-img/productF-5b-img.jpg"
  },
  {
    brand: "Tommy Hilfiger",
    name: "Men Cotton Polo Collar T-shirt",
    price: 5000,
    originalPrice: 4599,
    discount: "34% OFF",
    image: "/productsImg/allProducts-img/product-9a-img.jpg"
  },
];

const ProductGrid = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("");
  const [cart, setCart] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    alert(`${product.name} added to cart!`);
  };

  const filteredProducts = allProducts
    .filter(p =>
      (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
      p.price >= minPrice && p.price <= maxPrice
    )
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-6 px-4 py-6 bg-gray-50 min-h-screen">
        {/* Mobile Buttons for Filter and Sort */}
     
<div className="block sm:hidden w-full mb-4 relative">
  <div className="absolute top-0 left-0 right-0 flex justify-between">
    <button
      onClick={() => setIsFilterOpen((prev) => !prev)}
      className="w-full sm:w-1/2 bg-gray-500 text-white p-2 border rounded-s shadow-lg hover:bg-pink-400 flex items-center justify-center gap-2"
    >
      <FunnelIcon className="w-5 h-5" />
      {isFilterOpen ? "Hide Filters" : "Filters"}
    </button>

    <button
      onClick={() => setIsSortOpen((prev) => !prev)}
      className="w-full sm:w-1/3 bg-gray-500 text-white border p-2 rounded-e shadow-lg hover:bg-pink-400 flex items-center justify-center gap-2"
    >
      <ChevronUpDownIcon className="w-5 h-5" />
      {isSortOpen ? "Hide Sort" : "Sort"}
    </button>
  </div>
</div>


        {/* Sidebar (Filters) for Desktop */}
        <div className={`sm:w-64 w-full bg-white  rounded-lg shadow-md ${isFilterOpen ? 'block' : 'hidden sm:block'}`}>
          <Sidebar
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        <div className="flex-1">
          {/* SortBar for Desktop */}
          <div className={`${isSortOpen ? 'block' : 'hidden sm:block'}`}>
            <SortBar sortBy={sortBy} setSortBy={setSortBy} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">

            {filteredProducts.map((product, idx) => (
              <ProductCard product={product} key={idx} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
