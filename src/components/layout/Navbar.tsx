import React from 'react';
import { Link } from 'react-router-dom';
import { User, Search, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 lg:hidden">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
          <div className="max-w-lg w-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search people, skills, or locations..."
                type="search"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>
          
          <Link to="/settings" className="p-1 rounded-full text-gray-400 hover:text-gray-500">
            <span className="sr-only">Settings</span>
            <Settings className="h-6 w-6" />
          </Link>
          
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-2">
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">Open user menu</span>
                  <img 
                    className="h-8 w-8 rounded-full" 
                    src={user.avatar} 
                    alt={user.name} 
                  />
                </button>
                <button 
                  onClick={logout} 
                  className="text-sm text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <User className="h-5 w-5 mr-1" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;