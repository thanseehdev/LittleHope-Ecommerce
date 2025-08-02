// pages/SearchResultPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchResults } from '../../redux/features/user/product/newArrivalAction';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/userCom/common/Navbar';
import { Link } from 'react-router-dom';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResultPage = () => {
  const dispatch = useDispatch();
  const query = useQuery().get("q");

  const { results, loading, error } = useSelector((state) => state.newArrival);

  useEffect(() => {
    if (query) dispatch(fetchSearchResults(query));
  }, [query, dispatch]);

  return (
    <>
    <Navbar/>
    <div className="max-w-[1200px] mx-auto p-4">
      <h2 className="text-sm font-semibold mb-4">Search Results for "{query}"</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 gap-2">
        {results.length === 0 && !loading && <p>No results found.</p>}
        {results.map((product) => (
              <Link key={product.id} to={`/productDetails/${product._id}`}>
          <div key={product._id} className="border border-gray-200 lg:p-2 p-1 rounded  hover:shadow-lg">
            <img src={product.images[0]} alt={product.name} className="lg:h-64 h-44 w-full rounded-b-xl" />
            <h4 className="ml-1 mt-2 text-sm font-semibold">{product.name}</h4>
            <p className="ml-1 lg:text-base text-sm text-pink-500 font-semibold">₹{product.price}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default SearchResultPage;
