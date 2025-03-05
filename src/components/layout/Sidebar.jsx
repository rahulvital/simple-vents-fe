import React from 'react';
import { Link } from 'react-router-dom';
import { LucideX, LucideHome, LucideBriefcase } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, isDarkMode }) => {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 dark:text-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
      role="navigation"
      aria-label="Main navigation"
      id="sidebar-menu"
      aria-hidden={!isOpen}
    >
      <div className="flex justify-end p-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Close navigation menu"
        >
          <LucideX size={24} aria-hidden="true" />
        </button>
      </div>
      <nav>
        <ul className="space-y-2 px-4" role="menu">
          <li role="none">
            <Link 
              to="/" 
              className={`flex items-center p-2 rounded-md 
                hover:bg-gradient-to-r hover:from-pink-200 hover:to-purple-100 
                dark:hover:bg-gray-700 dark:hover:bg-gray-600
              `} role="menuitem"
            >
              <LucideHome className="mr-3" size={20} aria-hidden="true" />
              <span>Home</span>
            </Link>
          </li>
          <li role="none">
            <Link 
              to="/staff" 
              className={`flex items-center p-2 rounded-md 
                hover:bg-gradient-to-r hover:from-pink-200 hover:to-purple-100 
                dark:hover:bg-gray-700 dark:hover:bg-opacity-80
              `} onClick={toggleSidebar} role="menuitem"
            >
              <LucideBriefcase className="mr-3" size={20} aria-hidden="true" />
              <span>Staff Dashboard</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;