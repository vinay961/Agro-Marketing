import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../GlobalStateContext.jsx';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, setCart, products } = useContext(GlobalStateContext);
  const [showPayment, setShowPayment] = useState(false); // Payment step
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');

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
    if (!user) {
      navigate('/login');
    } else {
      setShowPayment(true); // Show payment methods after checkout click
    }
  };

  const handlePaymentSubmit = () => {
    if (selectedPaymentMethod === 'credit-card' || selectedPaymentMethod === 'debit-card') {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
        alert('Please fill in all card details');
        return;
      }
      console.log('Processing card payment:', cardDetails);
    } else if (selectedPaymentMethod === 'upi') {
      if (!upiId) {
        alert('Please enter your UPI ID');
        return;
      }
      console.log('Processing UPI payment:', upiId);
    }
    navigate('/successpage'); // Navigate after payment
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

      {!showPayment ? (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Select Payment Method</h2>
          <div className="flex flex-col items-center space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="credit-card"
                checked={selectedPaymentMethod === 'credit-card'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="form-radio h-4 w-4"
              />
              <span className="text-lg">Credit Card</span>
            </label>
            {selectedPaymentMethod === 'credit-card' && (
              <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-lg font-bold mb-2">Enter Card Details</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      value={cardDetails.expiryDate}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                      }
                      className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cvv: e.target.value })
                      }
                      className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="debit-card"
                checked={selectedPaymentMethod === 'debit-card'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="form-radio h-4 w-4"
              />
              <span className="text-lg">Debit Card</span>
            </label>
            {selectedPaymentMethod === 'debit-card' && (
              <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-lg font-bold mb-2">Enter Card Details</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      value={cardDetails.expiryDate}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, expiryDate: e.target.value })
                      }
                      className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({ ...cardDetails, cvv: e.target.value })
                      }
                      className="w-1/2 p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="upi"
                checked={selectedPaymentMethod === 'upi'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                className="form-radio h-4 w-4"
              />
              <span className="text-lg">UPI</span>
            </label>
            {selectedPaymentMethod === 'upi' && (
              <div className="w-full max-w-md bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-lg font-bold mb-2">Enter UPI ID</h3>
                <input
                  type="text"
                  placeholder="UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}

            <button
              onClick={handlePaymentSubmit}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Submit Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
