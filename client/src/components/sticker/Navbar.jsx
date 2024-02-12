import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import DropdownMenu from './DropdownMenu';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userProvider';
import DropdownMenu from './DropdownMenu';
import SearchQuery from './SearchQuery';

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
        <SearchQuery />
        
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
          <Link to="/cart" className="text-white focus:outline-none">
            <FontAwesomeIcon icon={faShoppingCart} className="text-white text-xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

