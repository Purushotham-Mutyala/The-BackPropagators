import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon 
}) => {
  const { isDarkMode } = useTheme();

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-emerald-500';
    if (changeType === 'negative') return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div 
      className={`p-6 rounded-lg shadow-sm transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-750' 
          : 'bg-white hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
          <p className={`mt-2 text-sm ${getChangeColor()}`}>
            {change} {changeType !== 'neutral' && (
              <span>{changeType === 'positive' ? '↑' : '↓'}</span>
            )}
          </p>
        </div>
        <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;