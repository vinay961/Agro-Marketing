import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Header({ isAuthenticated, logout, userRole }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <header className="bg-green-700 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Company Name */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200">Farmer's Hub</Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-lg font-bold">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="hover:text-gray-200">Home</Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-gray-200">Marketplace</Link>
            </li>
            <li>
              <Link to="/learn" className="hover:text-gray-200">Learn</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-200">Contact Us</Link>
            </li>
          </ul>
        </nav>

        {/* User Authentication Buttons or Avatar + Mobile Menu Toggle Button */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white"
              >
                <img 
                  src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001884.png" 
                  alt="User Avatar" 
                  className="w-full h-full rounded-full" 
                />
              </button>
              {isDropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  {userRole === 'farmer' && (
                    <Link to="/farmerdashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link> 
                  )}
                  {isAuthenticated && userRole === 'customer' && (
                      <Link to="/orderstatus" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Order Status</Link>
                  )}
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-white text-green-700 font-bold py-2 px-4 rounded hover:bg-gray-300">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
                Register
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-700 focus:ring-white"
            onClick={toggleMobileMenu}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuVisible && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4 text-lg font-bold px-4">
            <li>
              <Link to="/" className="hover:text-gray-200" onClick={toggleMobileMenu}>Home</Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-gray-200" onClick={toggleMobileMenu}>Marketplace</Link>
            </li>
            <li>
              <Link to="/learn" className="hover:text-gray-200" onClick={toggleMobileMenu}>Learn</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-200" onClick={toggleMobileMenu}>Contact Us</Link>
            </li>
            {/* Show Order Status button for customers in mobile menu */}
            {isAuthenticated && userRole === 'customer' && (
              <li>
                <Link to="/orderstatus" className="hover:text-gray-200" onClick={toggleMobileMenu}>Order Status</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
