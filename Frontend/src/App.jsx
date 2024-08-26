import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './components/layout/Header.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProductDetails from './components/public/ProductDetails.jsx';
import FarmerDashboard from './components/Farmer/FarmerDashboard.jsx';
import Marketplace from './pages/MarketPlace.jsx';
import AddProduct from './components/Farmer/AddProduct.jsx';
import EditProduct from './components/Farmer/EditProduct.jsx';
import ProfileView from './components/profile/ProfileView.jsx';
import EditProfile from './components/profile/EditProfile.jsx';
import ChangePassword from './components/profile/ChangePassword.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      const currentTime = new Date().getTime();
      if (currentTime < storedUser.expiryTime) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('loggedInUser');
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (token) => {
    const expiryTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour expiry
    const userWithExpiry = {
      ...token,
      expiryTime,
    };
    localStorage.setItem('loggedInUser', JSON.stringify(userWithExpiry));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        logout={handleLogout}
        userRole={isAuthenticated ? JSON.parse(localStorage.getItem('loggedInUser')).role : null}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/farmerdashboard" element={<FarmerDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
