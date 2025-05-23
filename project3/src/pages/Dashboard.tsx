import React from 'react';
import { PieChart, Activity, Shield, AlertTriangle, Check, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import StatCard from '../components/ui/StatCard';
import LineChart from '../components/charts/LineChart';
import DonutChart from '../components/charts/DonutChart';
import RecentAlerts from '../components/dashboard/RecentAlerts';

const Dashboard: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <select 
            className={`px-3 py-2 rounded-md border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-200' 
                : 'bg-white border-gray-300 text-gray-700'
            }`}
          >
            <option value="today">Today</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="year">Last year</option>
          </select>
          <button 
            className={`px-3 py-2 rounded-md border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            } transition-colors`}
          >
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Protected Links" 
          value="2,543" 
          change="+12%" 
          changeType="positive" 
          icon={<Shield className="text-emerald-500" />}
        />
        <StatCard 
          title="Threats Detected" 
          value="68" 
          change="+5%" 
          changeType="negative" 
          icon={<AlertTriangle className="text-red-500" />}
        />
        <StatCard 
          title="Threat Score" 
          value="Low" 
          change="-3%" 
          changeType="positive" 
          icon={<Activity className="text-blue-500" />}
        />
        <StatCard 
          title="Protection Rate" 
          value="99.7%" 
          change="+0.2%" 
          changeType="positive" 
          icon={<Check className="text-emerald-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 rounded-lg shadow-sm p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Threat Activity</h2>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center">
              <span>View Details</span>
              <ExternalLink size={14} className="ml-1" />
            </button>
          </div>
          <LineChart />
        </div>

        <div className={`rounded-lg shadow-sm p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Threat Types</h2>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center">
              <span>View Details</span>
              <ExternalLink size={14} className="ml-1" />
            </button>
          </div>
          <div className="flex justify-center">
            <DonutChart />
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Phishing</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Malware</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Scam</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Other</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold">Recent Alerts</h2>
        </div>
        <RecentAlerts />
      </div>
    </div>
  );
};

export default Dashboard;