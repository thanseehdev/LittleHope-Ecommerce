const SortBar = ({ sortBy, setSortBy }) => (
  <div className="flex justify-end mb-4">
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="border px-3 py-1 rounded"
    >
      <option value="">Sort By</option>
      <option value="priceLow">Price: Low to High</option>
      <option value="priceHigh">Price: High to Low</option>
    </select>
  </div>
);

export default SortBar;
