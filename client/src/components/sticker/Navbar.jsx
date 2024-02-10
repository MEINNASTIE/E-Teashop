import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import DropdownMenu from './DropdownMenu';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userProvider';
import DropdownMenu from './DropdownMenu';

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          {/* <img className="h-8" src="/logo.svg" alt="Logo" /> */}
          <span className="text-white text-xl font-semibold ml-2">E-Shop</span>
        </Link>
        
        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* User Login/Logout Button */}
        {isLoggedIn ? (
          // <button onClick={logout} className="text-white">
          //   Logout
          // </button>
          <DropdownMenu logout={logout} />
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

