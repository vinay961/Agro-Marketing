import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const CartPage = ({ cart = {}, products }) => {
//   const navigate = useNavigate();
  const location = useLocation();
  const { cart = {}, products = [] } = location.state || {};

  // Ensure cart is always an object before processing it
  const cartItems = cart && Object.keys(cart).length > 0 ? Object.keys(cart).map((productId) => {
    const product = products.find(p => p._id === productId);
    return {
      ...product,
      quantity: cart[productId],
    };
  }) : [];

  const handleCheckout = () => {
    // Add logic for checkout here
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map(item => (
          <div key={item._id} className="flex justify-between items-center p-4 border-b">
            <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover" />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-bold">{item.productName}</h3>
              <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="text-lg font-bold">₹{item.price * item.quantity}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}
      <div className="flex justify-between mt-8">
        <button onClick={() => navigate('/')} className="bg-blue-500 text-white py-2 px-4 rounded">
          Continue Shopping
        </button>
        <button onClick={handleCheckout} className="bg-green-500 text-white py-2 px-4 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
