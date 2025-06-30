
const ProductCard = ({ product, addToCart }) => (

  <div className=" p-2  hover:shadow rounded  outline:none">
    <img src={product.image} alt={product.name} className="w-1/1 h-1/1  rounded" />
    <div className="mt-2 text-sm text-gray-800 font-semibold outline:none">{product.brand}</div>
    <div className="text-xs text-gray-500">{product.name}</div>
    <div className="flex items-center gap-2 text-sm mt-1">
      <span className="text-red-600 font-bold">₹{product.price}</span>
      <span className="line-through text-gray-400 text-xs">₹{product.originalPrice}</span>
      <span className="text-green-600 text-xs">{product.discount}</span>
    </div>
  </div>
);

export default ProductCard;
