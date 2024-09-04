import React, { useContext,useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../../GlobalStateContext.jsx';
import { get, del } from '../../services/Api.jsx';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { cart } = useContext(GlobalStateContext);
  const [farmerName, setFarmerName] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const storedFarmer = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedFarmer && storedFarmer.name) {
      setFarmerName(storedFarmer.name);
    }

    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await get('/products/getuserproduct');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const cartItems = Object.keys(cart).map((productId) => {
    const product = products.find((p) => p._id === productId);
    return {
      ...product,
      quantity: cart[productId],
    };
  });
  console.log(cartItems);

  const deleteProduct = async (productId) => {
    try {
      await del(`/products/deleteproduct/${productId}`);
      alert("Product Removed Successfully.");
      // Remove the deleted product from the local state
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const capitalizeName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-0">Welcome, {capitalizeName(farmerName)}!</h1>
        <nav>
          <ul className="flex flex-wrap md:space-x-4 space-x-2 font-bold">
            <li><a href="#dashboard" className="text-blue-500 hover:underline">Dashboard</a></li>
            <li><a href="#product-management" className="text-blue-500 hover:underline">Product Management</a></li>
            <li><a href="#order-management" className="text-blue-500 hover:underline">Orders</a></li>
            <li><a href="#account-settings" className="text-blue-500 hover:underline">Account Settings</a></li>
          </ul>
        </nav>
      </header>

      {/* Overview/Stats Section */}
      <section id="dashboard" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-bold">Total Products</h2>
          <p className="text-xl md:text-2xl font-semibold">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-bold">Total Orders</h2>
          <p className="text-xl md:text-2xl font-semibold">{Object.keys(cart).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-bold">Pending Orders</h2>
          <p className="text-xl md:text-2xl font-semibold">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-bold">Earnings</h2>
          <p className="text-xl md:text-2xl font-semibold">₹10,000</p>
        </div>
      </section>

      {/* Product Management Section */}
      <section id="product-management" className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Product Management</h2>
        <button onClick={() => { navigate('/addproduct') }} className="bg-green-500 text-white font-bold py-2 px-4 rounded mb-4">Add New Product</button>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Your Products</h3>
          <ul className="space-y-2">
            {products.map((product, index) => (
              <li key={product._id} className="flex flex-col md:flex-row items-start md:items-center bg-white p-4 rounded-lg shadow-lg">
                <span className="font-semibold text-lg">{index + 1}. </span>
                <span className="ml-2 font-bold">Name:</span> 
                <span className="ml-2">{product.productName}</span>
                <span className="ml-2 font-bold">Price:</span>
                <span className="ml-2">₹{product.price}</span>
                <span className="ml-2 font-bold">Stock:</span>
                <span className="ml-2">{product.quantity} </span>
                <div className="mt-2 md:mt-0 ml-auto flex space-x-2">
                  <button onClick={() => { navigate('/editproduct', { state: { productId: product._id } }) }} className="bg-blue-500 text-white font-bold py-1 px-3 rounded">Edit</button>
                  <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white font-bold py-1 px-3 rounded">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Order Management Section */}
      <section id="order-management" className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Order Management</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Recent Orders</h3>
          <ul>
            {cartItems.map((item) => (
                <li key={item._id} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                  <span>{item.productName}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>Price: ₹{item.price * item.quantity}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </section>

      {/* Notifications Section */}
      <section id="notifications" className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Notifications</h2>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p>🔔 Low stock alert: Organic Tomatoes - 100 kg left</p>
        </div>
      </section>

      {/* Account Settings Section */}
      <section id="account-settings" className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Account Settings</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Profile Management</h3>
          <p>Name: {farmerName}</p>
          <p>Email: vinay.rai@example.com</p>
          <button onClick={()=>navigate('/editprofile')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 mr-2">Edit Profile</button>
          <button onClick={()=>navigate('/changepassword')} className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4">Change Password</button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2024 Farmer's Hub. All rights reserved.</p>
        <p>Contact Support: support@farmershub.com</p>
        <p><a href="#terms" className="text-blue-400 hover:underline">Terms & Conditions</a> | <a href="#privacy" className="text-blue-400 hover:underline">Privacy Policy</a></p>
      </footer>
    </div>
  );
};

export default FarmerDashboard;
