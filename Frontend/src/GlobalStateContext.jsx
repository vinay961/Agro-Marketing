import React, { createContext, useState, useEffect } from 'react';
import { get } from './services/Api.jsx';

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = checkUserAuthentication();
    setIsAuthenticated(authStatus);
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      if (isAuthenticated) {
        try {
          const fetchedCart = await fetchUserCart();
          console.log(fetchedCart);
          setCart(fetchedCart);
          localStorage.setItem('cart', JSON.stringify(fetchedCart));
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      } else {
        setCart({});
        localStorage.removeItem('cart');
      }
    };

    fetchCartData();
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  return (
    <GlobalStateContext.Provider value={{ cart, setCart, products, setProducts, isAuthenticated }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Helper functions
const checkUserAuthentication = () => {
  return Boolean(localStorage.getItem('loggedInUser'));
};

const fetchUserCart = async () => {
  try {
    const response = await get('/cart/getcartitem');
    console.log(response);
    
    if (!response) {
      throw new Error('Failed to fetch cart data');
    }
    
    
    const cartItems = response.data.cartItems || [];
    
    
    const cartObject = cartItems.reduce((acc, item) => {
      acc[item._id] = item; 
      return acc;
    }, {});

    return cartObject; 
  } catch (error) {
    console.error('Error fetching cart:', error);
    return {}; 
  }
};
