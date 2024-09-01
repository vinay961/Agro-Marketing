import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {};
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setCart(storedCart);
    setProducts(storedProducts);
  }, []);

  const incrementQuantityInCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [productId]: prevCart[productId] + 1,
      };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decrementQuantityInCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] > 1) {
        updatedCart[productId] -= 1;
      } else {
        delete updatedCart[productId];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleCheckout = () => {
    // Add your checkout logic here
  };

  const cartItems = Object.keys(cart).map((productId) => {
    const product = products.find((p) => p._id === productId);
    return {
      ...product,
      quantity: cart[productId],
    };
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{item.productName}</h3>
              <p className="text-lg font-semibold text-green-500 mb-2">₹{item.price} /-</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">{"★★★★☆"}</span>
                <span className="ml-2 text-gray-500">({20} reviews)</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">Category: {(item.category).toUpperCase()}</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decrementQuantityInCart(item._id)}
                  className="bg-gray-200 text-gray-800 py-1 px-2 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => incrementQuantityInCart(item._id)}
                  className="bg-gray-200 text-gray-800 py-1 px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">Your cart is empty</p>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={handleCheckout} className="bg-green-500 text-white font-bold py-2 px-4 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
