import React from 'react';

const Sidebar = ({ selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const category = ["Casual Wear", "Formal Wear", "Combo Sets", "Ethnic Wear","Sports Wear","Party Wear"];
  const gender = ["Boys", "Girls", "Unisex"];

  const toggleCategory= (category) => {
    setSelectedCategory(prev =>
      prev.includes(category) ? prev.filter(b => b !== category) : [...prev, category]
    );
  };

  return (
    <div className="w-full sm:w-64 bg-white p-4 rounded shadow mb-6 sm:mb-0">
      <h3 className="font-bold mb-4">Filters</h3>
      <div>
        <h4 className="font-medium">Category</h4>
        {category.map((category, idx) => (
          <label key={idx} className="block text-sm">
            <input
              type="checkbox"
              checked={selectedCategory.includes(category)}
              onChange={() => toggleCategory(category)}
              className="mr-2"
            />
            {category}
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
