import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, BarChart2, ZapIcon, BookOpen, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Sidebar: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <BarChart2 size={20} /> },
    { name: 'Detection', path: '/detection', icon: <ZapIcon size={20} /> },
    { name: 'Resources', path: '/resources', icon: <BookOpen size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 hidden md:block ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <div className="h-full flex flex-col">
        <div className={`p-4 flex ${collapsed ? 'justify-center' : 'justify-between'} items-center`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
            <Shield className="text-emerald-500" size={28} />
            {!collapsed && <span className="ml-2 text-xl font-bold">ShieldSentry</span>}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`${collapsed ? 'hidden' : 'block'} p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 py-6">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center ${collapsed ? 'justify-center' : ''} px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? `${isDarkMode ? 'bg-gray-700 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`
                      : `hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`
                  }`
                }
              >
                <span className={`${collapsed ? '' : 'mr-3'}`}>{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-4">
          <button 
            className={`flex items-center ${collapsed ? 'justify-center' : ''} px-4 py-2 w-full rounded-lg hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-colors`}
          >
            <LogOut size={20} className={`${collapsed ? '' : 'mr-3'} text-gray-500`} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;