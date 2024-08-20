import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header({ isAuthenticated, handleLogout }) { // Receive props
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <header className="bg-green-700 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Company Name */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200">Farmer's Hub</Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-l font-bold">
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

        {/* User Authentication Buttons or Avatar */}
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <div className="relative">
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
                  <button 
                    onClick={handleLogout} // Use handleLogout from props
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                  {/* Add more options here if needed */}
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
        </div>
      </div>
    </header>
  );
}

export default Header;
