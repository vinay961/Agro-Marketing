import React from 'react';
import { useEffect,useState } from 'react';
import Footer from '../components/layout/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import {get} from '../services/Api.jsx'

const Home = () => {
  const navigate = useNavigate()
  const [products,setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await get('/products/getproduct');
        console.log('Fetched products:', response.data); 
        setProducts(response.data);
      } catch (err) {
        alert('Failed to fetch products');
        console.log(err);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="text-center py-20 bg-green-500 text-white">
        <h1 className="text-5xl font-bold mb-4">Empowering Farmers, Connecting Markets</h1>
        <p className="text-xl mb-8">Sell your produce directly, learn about e-farming, and grow your business with ease.</p>
        <button className="bg-white text-green-500 font-bold py-2 px-4 rounded hover:bg-gray-200">Get Started</button>
      </section>

      {/* Key Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Locate Marketplaces</h3>
              <p>Find the best place to sell your products.</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Manage Sales</h3>
              <p>Track and update your orders easily.</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">E-Farming Education</h3>
              <p>Learn how to enhance your farming practices.</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Secure Transactions</h3>
              <p>Ensuring a safe and reliable marketplace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Preview Section */}
      <section className="py-16 bg-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Marketplace</h2>
        
        <div className="flex overflow-x-auto space-x-8 m-10">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg flex-shrink-0 w-96">
                <img src={product.productImage} alt={product.productName} className="w-full h-60 object-cover mb-4 border border-black-300 rounded" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 1, 0.1)' }} />
                <h3 className="text-xl font-bold mb-2">{product.productName}</h3>
                <p className="text-lg font-semibold text-green-500 mb-2">{product.price}/- per kg</p>
                
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500">★★★★☆</span>
                  <span className="ml-2 text-gray-500">(40 reviews)</span>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
                <p className="text-gray-700 mb-4 overflow-hidden text-ellipsis whitespace-nowrap">{product.productDesc}</p> {/* Control text overflow */}
                
                <button onClick={() => navigate('/productdetails', { state: { productId: product.id }})} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2 mr-2">View Details</button>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products available at the moment.</p>
          )}
        </div>
     </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Farmers Say</h2>
        <div className="text-center">
          <p className="text-xl italic">"This platform has revolutionized the way I sell my crops. It's efficient and easy to use!"</p>
          <p className="mt-4 font-bold">- Shikhar Singh</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
