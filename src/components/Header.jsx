import React from 'react';
import { LucideMenu, LucideMoon, LucideSun } from 'lucide-react';

const Header = ({ isDarkMode, toggleDarkMode, toggleSidebar, isSidebarOpen }) => {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-20 ${isDarkMode ? 'bg-gradient-to-r from-customBlue to-customPurple' : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'} shadow-md`}
      role="banner"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-800"
          aria-label={`${isSidebarOpen ? 'Close' : 'Open'} navigation menu`}
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar-menu"
        >
          <LucideMenu size={24} aria-hidden="true" />
        </button>
        <h1 className="text-2xl font-bold">Vents</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-purple-600 dark:hover:bg-purple-500"
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          aria-pressed={isDarkMode}
        >
          {isDarkMode ? 
            <LucideSun size={24} aria-hidden="true" /> : 
            <LucideMoon size={24} aria-hidden="true" />
          }
        </button>
      </div>
    </header>
  );
};

export default Header;