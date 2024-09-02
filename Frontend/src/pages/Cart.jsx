import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../GlobalStateContext.jsx';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, setCart, products } = useContext(GlobalStateContext);

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
    const user = localStorage.getItem('loggedInUser');
    if(!user){
      navigate('/login')
    }
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
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="flex bg-white p-4 rounded-lg shadow-lg items-center space-x-4">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
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
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty</p>
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
