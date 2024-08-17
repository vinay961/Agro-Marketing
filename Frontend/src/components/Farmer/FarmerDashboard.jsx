import React from 'react';

const FarmerDashboard = () => {
  const farmerName = "Vinay Rai";

  // Demo data for products
  const products = [
    { id: 1, name: 'Organic Tomatoes', price: '30/- per kg', stock: 100 },
    { id: 2, name: 'Golden Apples', price: '110/- per kg', stock: 50 },
    { id: 3, name: 'Organic Spinach', price: '39/- per bunch', stock: 75 },
  ];

  // Demo data for orders
  const orders = [
    { id: 1, product: 'Organic Tomatoes', quantity: 10, customer: 'John Doe', status: 'Pending' },
    { id: 2, product: 'Golden Apples', quantity: 5, customer: 'Jane Doe', status: 'Shipped' },
    { id: 3, product: 'Organic Spinach', quantity: 15, customer: 'Bob Smith', status: 'Delivered' },
  ];

  return (
    <div className="p-8">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Welcome, {farmerName}!</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#dashboard" className="text-blue-500 hover:underline">Dashboard</a></li>
            <li><a href="#product-management" className="text-blue-500 hover:underline">Product Management</a></li>
            <li><a href="#order-management" className="text-blue-500 hover:underline">Orders</a></li>
            <li><a href="#account-settings" className="text-blue-500 hover:underline">Account Settings</a></li>
            <li><a href="#logout" className="text-red-500 hover:underline">Logout</a></li>
          </ul>
        </nav>
      </header>

      {/* Overview/Stats Section */}
      <section id="dashboard" className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Total Products</h2>
          <p className="text-2xl font-semibold">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Total Orders</h2>
          <p className="text-2xl font-semibold">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Pending Orders</h2>
          <p className="text-2xl font-semibold">{orders.filter(order => order.status === 'Pending').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Earnings</h2>
          <p className="text-2xl font-semibold">₹10,000</p>
        </div>
      </section>

      {/* Product Management Section */}
      <section id="product-management" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Product Management</h2>
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mb-4">Add New Product</button>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Your Products</h3>
          <ul>
            {products.map(product => (
              <li key={product.id} className="flex justify-between items-center mb-2">
                <span>{product.name}</span>
                <span>{product.price}</span>
                <span>Stock: {product.stock}</span>
                <div>
                  <button className="bg-blue-500 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white font-bold py-1 px-3 rounded">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Order Management Section */}
      <section id="order-management" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Management</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <ul>
            {orders.map(order => (
              <li key={order.id} className="flex justify-between items-center mb-2">
                <span>{order.product}</span>
                <span>Qty: {order.quantity}</span>
                <span>Customer: {order.customer}</span>
                <span>Status: {order.status}</span>
                <button className="bg-yellow-500 text-white font-bold py-1 px-3 rounded">Update Status</button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Notifications Section */}
      <section id="notifications" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p>🔔 Low stock alert: Organic Tomatoes - 100 kg left</p>
        </div>
      </section>

      {/* Account Settings Section */}
      <section id="account-settings" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Profile Management</h3>
          <p>Name: {farmerName}</p>
          <p>Email: vinay.rai@example.com</p>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 mr-2">Edit Profile</button>
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4">Change Password</button>
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
