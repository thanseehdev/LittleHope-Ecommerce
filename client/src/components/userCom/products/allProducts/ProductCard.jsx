import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => (
  <Link key={product.id} to={`/productDetails/${product._id}`}>
    <div className="p-2 hover:shadow-xl rounded outline-none">
      <img src={product.images[0]} alt={product.name} className="h-52 w-52 lg:h-[300px] lg:w-[250px] rounded" />
      <div className="mt-2 text-sm text-gray-800 font-semibold">{product.category}</div>
      <div className="text-xs text-gray-500">{product.name}</div>
      <div className="flex items-center gap-2 text-sm mt-1">
        <span className="text-red-600 font-bold">₹{product.discountPrice}</span>
        <span className="line-through text-gray-400 text-xs">₹{product.price}</span>
        <span className="text-green-600 text-xs">
          -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
        </span>
      </div>
    </div>
  </Link>
);

export default ProductCard;

