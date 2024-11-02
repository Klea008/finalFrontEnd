import React , { useState } from 'react';
import useUserStore from '../stores/useUserStore';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useUserStore();


  const handleLogout = async () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center max-w-screen-lg">
        <div className="text-lg font-bold">BookS</div>

        <div className="hidden md:flex space-x-4">
          <a href="/" className="px-1 py-2 hover:bg-gray-700 rounded">Home</a>
          <a href="/explore" className="px-1 py-2 hover:bg-gray-700 rounded">Explore</a>
          <a href="/lists" className="px-1 py-2 hover:bg-gray-700 rounded">Lists</a>

          <a href="/bookmarks" className="px-1 py-2 hover:bg-gray-700 rounded">Bookmarks</a>
          <a href="/read" className="px-1 py-2 hover:bg-gray-700 rounded">Read</a>
          <a href="/profile" className="px-1 py-2 hover:bg-gray-700 rounded">Profile</a>
          {user ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
              <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">Login</a>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            className="p-2 rounded focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800 text-white`}>
        <div className="flex flex-col">
          <a href="/" className="py-2 hover:bg-gray-700 rounded text-center">Home</a>
          <a href="/explore" className="py-2 hover:bg-gray-700 rounded text-center">Explore</a>
          <a href="/lists" className="py-2 hover:bg-gray-700 rounded text-center">Lists</a>
          <a href="/lists" className="py-2 hover:bg-gray-700 rounded text-center">Bookmarks</a>
          <a href="/lists" className="py-2 hover:bg-gray-700 rounded text-center">Books</a>
          {user ? (
            <button
              className="py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
              <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
