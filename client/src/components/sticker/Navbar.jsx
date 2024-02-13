import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";

import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userProvider';
import DropdownMenu from './DropdownMenu';

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(UserContext);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const jwt_token = localStorage.getItem('jwt_token');
        if (!jwt_token) {
          console.error('JWT token not found in local storage');
          return;
        }

        const response = await axios.get('http://localhost:5000/admin/cart', {
          headers: {
            Authorization: `Bearer ${jwt_token}`
          }
        });
        setCartItemCount(response.data.cart.length);
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };

    fetchCartItemCount();
  }, []);

  return (
    <nav className="bg-[#BCC490] py-4">
      <div className="container mx-auto flex justify-between items-center">
       
        <Link to="/" className="flex items-center">
          <img className="h-8" src="/assets/tea.png" alt="Logo" />
          <span className="text-white text-xl font-semibold ml-2">Teapunktur</span>
        </Link>
        
        <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <DropdownMenu logout={logout} />
        ) : (
          <Link to="/login" className="text-white"><FontAwesomeIcon icon={faUser} className="text-[26px]"/></Link>
        )}

          <div>
            <Link to="/cart" className="text-white focus:outline-none">
              <FontAwesomeIcon icon={faShoppingCart} className="text-[26px]" />
              {cartItemCount > 0 && <span className="absolute top-2 right-[9.3%] bg-[#E56E3C] rounded-full text-[9px] pl-2 pr-2 pt-1 pb-1 font-bold">{cartItemCount}</span>}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

