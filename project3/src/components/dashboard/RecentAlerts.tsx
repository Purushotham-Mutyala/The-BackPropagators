import React from 'react';
import { ExternalLink, AlertTriangle, Shield, Link2, Globe, Mail } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Alert {
  id: number;
  type: 'phishing' | 'malware' | 'scam' | 'suspicious';
  source: 'web' | 'email' | 'social' | 'message';
  url: string;
  detectedAt: string;
  status: 'blocked' | 'warned' | 'allowed';
  risk: 'high' | 'medium' | 'low';
}

const RecentAlerts: React.FC = () => {
  const { isDarkMode } = useTheme();

  const alerts: Alert[] = [
    {
      id: 1,
      type: 'phishing',
      source: 'email',
      url: 'secure-myaccount.com/login',
      detectedAt: '2 minutes ago',
      status: 'blocked',
      risk: 'high'
    },
    {
      id: 2,
      type: 'suspicious',
      source: 'web',
      url: 'amazan-support.net/verification',
      detectedAt: '1 hour ago',
      status: 'warned',
      risk: 'medium'
    },
    {
      id: 3,
      type: 'malware',
      source: 'web',
      url: 'download-free-software.xyz',
      detectedAt: '3 hours ago',
      status: 'blocked',
      risk: 'high'
    },
    {
      id: 4,
      type: 'scam',
      source: 'social',
      url: 'win-free-prize.com/claim',
      detectedAt: 'Yesterday',
      status: 'blocked',
      risk: 'medium'
    },
    {
      id: 5,
      type: 'phishing',
      source: 'message',
      url: 'verify-bank-details.info',
      detectedAt: 'Yesterday',
      status: 'blocked',
      risk: 'high'
    }
  ];

  const getTypeColor = (type: string, risk: string) => {
    switch(type) {
      case 'phishing':
        return risk === 'high' ? 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400' : 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400';
      case 'malware':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400';
      case 'scam':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'suspicious':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'blocked':
        return 'text-white bg-red-500';
      case 'warned':
        return 'text-white bg-amber-500';
      case 'allowed':
        return 'text-white bg-green-500';
      default:
        return 'text-white bg-gray-500';
    }
  };

  const getSourceIcon = (source: string) => {
    switch(source) {
      case 'web':
        return <Globe size={16} />;
      case 'email':
        return <Mail size={16} />;
      case 'social':
        return <Link2 size={16} />;
      case 'message':
        return <AlertTriangle size={16} />;
      default:
        return <Link2 size={16} />;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Source</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">URL</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Detected</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {alerts.map((alert) => (
            <tr 
              key={alert.id} 
              className={`${
                isDarkMode 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-50'
              } transition-colors`}
            >
              <td className="px-4 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(alert.type, alert.risk)}`}>
                  {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`p-1.5 rounded-full mr-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    {getSourceIcon(alert.source)}
                  </div>
                  <span className="capitalize">{alert.source}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <span className="text-sm font-mono truncate max-w-xs">{alert.url}</span>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                {alert.detectedAt}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-md ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <div className="flex space-x-2">
                  <button className={`p-1.5 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                    <Shield size={16} className="text-emerald-500" />
                  </button>
                  <button className={`p-1.5 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                    <ExternalLink size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAlerts;