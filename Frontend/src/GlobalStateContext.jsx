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
  }, []); // Check authentication only once on mount

  useEffect(() => {
    const fetchCartData = async () => {
      if (isAuthenticated) {
        try {
          const fetchedCart = await fetchUserCart();
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
    if (!response.ok) {
      throw new Error('Failed to fetch cart data');
    }
    const data = await response.json();
    return data.cart || {}; 
  } catch (error) {
    console.error('Error fetching cart:', error);
    return {}; 
  }
};
