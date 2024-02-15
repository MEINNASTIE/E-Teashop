import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/userProvider';

export default function DropdownMenu({ logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" onClick={toggleDropdown} className="text-white focus:outline-none">
          {user.email}
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 shadow-s bg-white focus:outline-none mt-5 transition-opacity duration-300 ease-in-out opacity-100">
          <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {user.role === 'admin' && ( 
              <>
                <Link to="/admin" className="pl-4 block py-1 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300">Admin Dashboard</Link> 
                
              </>
            )}
            <Link to="/userprofile" className="pl-4 block py-2 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300">User Profile</Link>
           
            <button
              onClick={logout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#782F10] w-full text-left transition-colors duration-300"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}





