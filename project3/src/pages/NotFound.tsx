import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const NotFound: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className={`p-6 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-6`}>
        <ShieldAlert size={64} className="text-red-500" />
      </div>
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;