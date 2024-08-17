import { Link } from 'react-router-dom';

function Header() {
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
        
        {/* User Authentication Buttons */}
        <div className="flex space-x-4">
          <Link to="/login" className="bg-white text-green-700 font-bold py-2 px-4 rounded hover:bg-gray-300">
            Login
          </Link>
          <Link to="/register" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
