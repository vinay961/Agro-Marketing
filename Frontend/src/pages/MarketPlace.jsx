import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../services/Api.jsx';

const ITEMS_PER_PAGE = 8; 

const Marketplace = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await get('/products/getproduct');
        console.log('Fetched products:', response.data); 
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const productName = product.productName ? product.productName.toLowerCase() : '';
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      productName.includes(lowerCaseSearchTerm)
    );
  });

  // Calculate total pages based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Get current page products based on filtered products
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Explore Our Marketplace</h1>
      
      {/* Search Bar */}
      <div className="flex justify-between mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full md:w-1/3"
        />
        
        {/* Filter by Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded ml-4"
        >
          <option value="All">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
        </select>
      </div>

      {/* Product Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{product.productName}</h3>
              <p className="text-lg font-semibold text-green-500 mb-2">₹{product.price} /-</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">{"★★★★☆"}</span>
                <span className="ml-2 text-gray-500">({20} reviews)</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Category: {(product.category).toUpperCase()} </p>
              <button onClick={() => navigate('/productdetails')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2">
                View Details
              </button>
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-gray-500">No products found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
