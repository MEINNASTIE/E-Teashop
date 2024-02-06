import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import DropdownMenu from './DropdownMenu';

import { useAuth } from '../auth/AuthLoginContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  console.log('IsLoggedIn in Navbar:', isLoggedIn);
  console.log('Logout present:', logout)

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
        
        {/* User Login Dropdown logic */}
        {/* {isLoggedIn ? <DropdownMenu logout={logout} /> : <Link to="/login">Login</Link>} */}

        {isLoggedIn ? (
          <button onClick={logout} className="text-white">
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-white">Login</Link>
        )}

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

