import React from 'react';
import { AlertTriangle, CheckCircle, Info, X, AlertCircle } from 'lucide-react';
import { useAlert } from '../../contexts/AlertContext';

const AlertBanner: React.FC = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert) return null;

  const getAlertStyles = () => {
    switch (alert.type) {
      case 'success':
        return 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'error':
        return 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    }
  };

  const getAlertIcon = () => {
    switch (alert.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      case 'info':
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <div className={`mb-6 p-4 rounded-lg flex items-start justify-between ${getAlertStyles()}`}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          {getAlertIcon()}
        </div>
        <div>
          <p className="font-medium">{alert.message}</p>
        </div>
      </div>
      <button
        onClick={hideAlert}
        className="flex-shrink-0 ml-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AlertBanner;