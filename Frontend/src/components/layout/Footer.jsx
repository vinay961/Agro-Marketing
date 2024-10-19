// src/components/Footer.js
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Company Information */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4">About Farmer's Hub</h3>
          <p className="text-sm sm:text-base">
            Farmer's Hub is a dedicated platform that connects farmers directly with consumers, 
            enabling the sale of fresh produce and goods directly from the farm to the table. 
            Our mission is to support local farmers and provide fresh, healthy food to communities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/marketplace" className="hover:underline">Marketplace</Link></li>
            <li><Link to="/learn" className="hover:underline">Learn</Link></li>
            <li><Link to="/profile-setup" className="hover:underline">Profile</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>

          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm sm:text-base">123 Hero Honda Chowk, Gurugram, Delhi 12345</p>
          <p className="text-sm sm:text-base">Email: support@farmershub.com</p>
          <p className="text-sm sm:text-base">Phone: +1 (123) 456-7890</p>
          
          {/* Social Media Links */}
          <div className="mt-4">
            <h3 className="text-lg sm:text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-400 text-sm sm:text-base" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com" className="hover:text-gray-400 text-sm sm:text-base" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com" className="hover:text-gray-400 text-sm sm:text-base" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://linkedin.com" className="hover:text-gray-400 text-sm sm:text-base" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm sm:text-base">&copy; 2024 Farmer's Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
