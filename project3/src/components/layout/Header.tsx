import React, { useState } from 'react';
import { Bell, Menu, X, Shield, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import NotificationPanel from '../ui/NotificationPanel';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-md`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex md:flex-1 items-center">
          <div className={`relative flex items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full px-3 py-2 w-full max-w-md`}>
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for alerts, resources..."
              className={`ml-2 bg-transparent border-none focus:outline-none flex-1 ${isDarkMode ? 'text-white placeholder:text-gray-400' : 'text-gray-900 placeholder:text-gray-500'}`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)} 
              className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${showNotifications ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-200') : ''}`}
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">3</span>
            </button>
            
            {showNotifications && (
              <NotificationPanel onClose={() => setShowNotifications(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;