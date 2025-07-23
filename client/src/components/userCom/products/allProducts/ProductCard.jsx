import { Link } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => (
  <Link key={product.id} to={`/productDetails/${product._id}`}>
    <div className="lg:p-2 p-1 lg:hover:shadow-xl outline-none">
      <img src={product.images[0]} alt={product.name} className="lg:h-[350px] lg:w-[300px] h-52 w-52 rounded-sm" />
      <div className="lg:text-base mt-2 ml-1 text-sm text-gray-800 font-semibold">{product.name}</div>
      <div className="text-xs ml-1 text-gray-500">{product.category}</div>
      <div className="flex ml-1 items-center gap-2 text-sm mt-1">
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

