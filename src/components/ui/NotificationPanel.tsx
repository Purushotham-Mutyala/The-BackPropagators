import React from 'react';
import { X, AlertTriangle, Shield, Info } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface NotificationPanelProps {
  onClose: () => void;
}

interface Notification {
  id: number;
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  time: string;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { isDarkMode } = useTheme();
  
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'danger',
      title: 'Phishing Attempt Detected',
      message: 'Suspicious link detected in email from "support@faecbook.com"',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Suspicious Website',
      message: 'Attempted visit to a known phishing domain was blocked',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'Security Scan Complete',
      message: 'Weekly scan completed. No threats detected.',
      time: 'Yesterday'
    }
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'danger':
        return <Shield className="text-red-500" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-amber-500" size={20} />;
      case 'info':
        return <Info className="text-blue-500" size={20} />;
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  return (
    <div 
      className={`absolute right-0 top-full mt-2 w-96 shadow-lg rounded-lg overflow-hidden z-50 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium">Notifications</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications
          </div>
        ) : (
          <div>
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'} transition-colors`}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
        <button className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;