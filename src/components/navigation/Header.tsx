import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/scan':
        return 'Scan Link';
      case '/history':
        return 'Scan History';
      case '/education':
        return 'Phishing Education';
      case '/settings':
        return 'Settings';
      default:
        return 'ShieldSentry';
    }
  };

  return (
    <header className={`h-16 px-4 md:px-6 flex items-center justify-between border-b ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h1 className="text-lg md:text-xl font-semibold ml-12 md:ml-0">{getPageTitle()}</h1>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>
        <button 
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="flex items-center ml-2 md:ml-4">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;