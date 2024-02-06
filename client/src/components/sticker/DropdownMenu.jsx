export default function DropdownMenu({ logout }){
  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" className="text-white focus:outline-none">
          User
        </button>
      </div>
      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <button
            onClick={logout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            role="menuitem"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}




