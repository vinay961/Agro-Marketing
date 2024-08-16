import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './components/layout/Header.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={< Register />} />
        <Route path='/login' element={< Login />} />
      </Routes>
    </Router>
  );
}

export default App;
