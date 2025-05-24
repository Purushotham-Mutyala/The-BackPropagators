import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import { useTheme } from '../contexts/ThemeContext';
import AlertBanner from '../components/ui/AlertBanner';
import { useAlert } from '../contexts/AlertContext';

const MainLayout: React.FC = () => {
  const { theme } = useTheme();
  const { alert } = useAlert();
  
  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {alert && <AlertBanner />}
            <Outlet />
          </div>
        </main>
        <footer className="py-4 px-6 text-sm text-center border-t border-gray-200 dark:border-gray-700">
          ShieldSentry © {new Date().getFullYear()} - Protecting you from phishing attacks
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;