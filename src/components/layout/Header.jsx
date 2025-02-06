import React from 'react';
import { LucideMenu, LucideMoon, LucideSun } from 'lucide-react';
import Auth from '../auth/Auth';

const Header = ({ isDarkMode, toggleDarkMode, toggleSidebar, isSidebarOpen }) => {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-20 
        ${isDarkMode ? 'bg-customBlue' : 
          'bg-gradient-to-r from-customDark to-customDark2 text-white'} shadow-md`}
      role="banner"
    >
      <div className="container mx-auto px-0 py-3 flex justify-between items-center text-white">
        <div className="flex items-center left-3">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md hover:bg-customDark2 dark:hover:bg-blue-800"
            aria-label={`${isSidebarOpen ? 'Close' : 'Open'} navigation menu`}
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar-menu"
          >
            <LucideMenu size={24} aria-hidden="true" />
          </button>
        </div>
          <h1 className={`text-2xl font-bold ml-4 text-center`}>Vents</h1>
        
        <div className="flex items-center space-x-4">
          <Auth isDarkMode={isDarkMode} />
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-red-300 dark:hover:bg-blue-800"
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? 
              <LucideSun size={24} aria-hidden="true" /> : 
              <LucideMoon size={24} aria-hidden="true" />
            }
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;