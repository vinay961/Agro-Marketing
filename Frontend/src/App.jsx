import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './components/layout/Header.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProductDetails from './components/public/ProductDetails.jsx';
import FarmerDashboard from './components/Farmer/FarmerDashboard.jsx';
import Marketplace from './pages/MarketPlace.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('loggedInUser'));

  const login = (token) => {
    localStorage.setItem('loggedInUser', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login login={login} />} />
        <Route path='/productdetails' element={<ProductDetails />} />
        <Route path='/farmerdashboard' element={<FarmerDashboard />} />
        <Route path='/marketplace' element={<Marketplace />} />
      </Routes>
    </Router>
  );
}

export default App;
