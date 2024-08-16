import React from 'react';
import Footer from '../components/layout/Footer.jsx';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="text-center py-20 bg-green-500 text-white">
        <h1 className="text-5xl font-bold mb-4">Empowering Farmers, Connecting Markets</h1>
        <p className="text-xl mb-8">Sell your produce directly, learn about e-farming, and grow your business with ease.</p>
        <button className="bg-white text-green-500 font-bold py-2 px-4 rounded">Get Started</button>
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
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Marketplace</h2>
        
        <div className="flex overflow-x-auto space-x-8 m-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="https://th.bing.com/th/id/OIP.HcFdIAP4zeO1zdEQTc3KdwHaHa?rs=1&pid=ImgDetMain" alt="Product 2" className="w-full h-60 object-cover mb-4" />
                <h3 className="text-xl font-bold mb-2">Organic Tomatoes</h3>
                <p className="text-lg font-semibold text-green-500 mb-2">30-/ per kg</p>
                
                <div className="flex items-center mb-4">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="ml-2 text-gray-500">(85 reviews)</span>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">Category: Vegetables</p>
                <p className="text-gray-700 mb-4">Farm-fresh organic tomatoes, perfect for your kitchen.</p>
                
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2 mr-2">View Details</button>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="https://media.istockphoto.com/id/870435768/photo/man-puts-yellow-ripe-golden-apple-to-a-wooden-box-of-yellow-at-the-orchard-farm-grower.jpg?s=612x612&w=0&k=20&c=BSVdxYCUowrw3Wl4O5gA3PpZygPDvPjUDmH-jS2PFLk=" alt="Product 2" className="w-full h-60 object-cover mb-4" />
                <h3 className="text-xl font-bold mb-2">Golden Apples</h3>
                <p className="text-lg font-semibold text-green-500 mb-2">110-/ per kg</p>
                
                <div className="flex items-center mb-4">
                    <span className="text-yellow-500">★★★★☆</span>
                    <span className="ml-2 text-gray-500">(85 reviews)</span>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">Category: Fruits</p>
                <p className="text-gray-700 mb-4">Farm-fresh organic Golden Apples, perfect for your Health.</p>
                
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2 mr-2">View Details</button>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <img src="https://th.bing.com/th/id/OIP.7yZ0dtiUa6R4dndMqMg0gwHaHa?rs=1&pid=ImgDetMain" alt="Product 4" className="w-full h-60 object-cover mb-4" />
                <h3 className="text-xl font-bold mb-2">Organic Spinach</h3>
                <p className="text-lg font-semibold text-green-500 mb-2">$1.99 per bunch</p>
                <p className="text-gray-700 mb-4">Fresh and organic spinach, rich in nutrients and antioxidants.</p>
                
                <div className="flex items-center mb-4">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="ml-2 text-gray-500">(45 reviews)</span>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">Category: Vegetables</p>
                
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-2 mr-2">View Details</button>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">Add to Cart</button>
            </div>

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
