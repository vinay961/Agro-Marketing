import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './components/layout/Header.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ProductDetails from './components/public/ProductDetails.jsx';
import FarmerDashboard from './components/Farmer/FarmerDashboard.jsx';
import Marketplace from './pages/MarketPlace.jsx';
import AddProduct from './components/Farmer/AddProduct.jsx';
import EditProduct from './components/Farmer/EditProduct.jsx';


function App() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'))
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('loggedInUser'));

  const login = (token) => {
    localStorage.setItem('loggedInUser',JSON.stringify(token));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} logout={handleLogout} userRole={user? user.role:null} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login login={login} />} />
        <Route path='/productdetails' element={<ProductDetails />} />
        <Route path='/farmerdashboard' element={<FarmerDashboard />} />
        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/editproduct' element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
