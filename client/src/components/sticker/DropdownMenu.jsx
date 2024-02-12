import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../context/userProvider';

export default function DropdownMenu({ logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useContext(UserContext);

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
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {user.role === 'admin' && ( 
              <>
                <Link to="/admin">Profile</Link> 
                <hr></hr>
              </>
            )}
            <button
              onClick={logout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
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




