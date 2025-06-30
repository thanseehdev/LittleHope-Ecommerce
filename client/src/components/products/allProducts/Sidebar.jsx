import React from 'react';

const Sidebar = ({ selectedBrands, setSelectedBrands, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const brands = ["RARE RABBIT", "Tommy Hilfiger", "Roadster", "Campus Sutra"];

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="w-full sm:w-64 bg-white p-4 rounded shadow mb-6 sm:mb-0">
      <h3 className="font-bold mb-4">Filters</h3>
      <div>
        <h4 className="font-medium">Brands</h4>
        {brands.map((brand, idx) => (
          <label key={idx} className="block text-sm">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>
      <div className="mt-4">
        <h4 className="font-medium">Price Range</h4>
        <input
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(Number(e.target.value))}
          className="border p-1 mt-1 w-full text-sm"
          placeholder="Min"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="border p-1 mt-2 w-full text-sm"
          placeholder="Max"
        />
      </div>
    </div>
  );
};

export default Sidebar;
