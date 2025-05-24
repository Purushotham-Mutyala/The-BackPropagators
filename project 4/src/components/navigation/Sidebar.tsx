import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, BarChart2, Search, History as ClockHistory, BookOpen, Settings, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { path: '/', icon: <BarChart2 size={20} />, label: 'Dashboard' },
    { path: '/scan', icon: <Search size={20} />, label: 'Scan' },
    { path: '/history', icon: <ClockHistory size={20} />, label: 'History' },
    { path: '/education', icon: <BookOpen size={20} />, label: 'Education' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside 
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:sticky top-0 left-0 h-screen w-64 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-lg transition-transform duration-300 ease-in-out z-40 md:z-0`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Shield size={24} className="text-teal-500" />
            <h1 className="text-xl font-bold">ShieldSentry</h1>
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">AI Phishing Protection</p>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="mb-2">
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center py-3 px-4 rounded-lg mx-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-500 text-white'
                        : `hover:bg-gray-200 dark:hover:bg-gray-700 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-sm font-medium">Protection Status</p>
            <div className="flex items-center mt-2">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs">Active & Protected</span>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;