import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img className="h-8" src="/logo.svg" alt="Logo" />
          <span className="text-white text-xl font-semibold ml-2">E-Shop</span>
        </div>
        
        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* User Login */}
        <div className="mr-4">
          <Link to="/login" className="text-white focus:outline-none">
            <FontAwesomeIcon icon={faUser} className="text-white text-xl" />
          </Link>
        </div>
        
        {/* Cart */}
        <div>
          <button className="text-white focus:outline-none">
            <FontAwesomeIcon icon={faShoppingCart} className="text-white text-xl" />
          </button>
        </div>
      </div>
    </nav>
  );
}

