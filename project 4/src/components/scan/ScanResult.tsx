import React from 'react';
import { Shield, AlertTriangle, AlertCircle, CheckCircle, ExternalLink, Copy } from 'lucide-react';
import { ScanResult as ScanResultType, ThreatLevel } from '../../contexts/ScanContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useAlert } from '../../contexts/AlertContext';

interface ScanResultProps {
  result: ScanResultType;
}

const ScanResult: React.FC<ScanResultProps> = ({ result }) => {
  const { showAlert } = useAlert();
  
  const getThreatBadge = (threatLevel: ThreatLevel) => {
    switch (threatLevel) {
      case 'safe':
        return (
          <div className="flex items-center px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-sm">
            <CheckCircle size={16} className="mr-1" />
            Safe
          </div>
        );
      case 'suspicious':
        return (
          <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded-full text-sm">
            <AlertTriangle size={16} className="mr-1" />
            Suspicious
          </div>
        );
      case 'dangerous':
        return (
          <div className="flex items-center px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 rounded-full text-sm">
            <AlertCircle size={16} className="mr-1" />
            Dangerous
          </div>
        );
      default:
        return (
          <div className="flex items-center px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded-full text-sm">
            <Shield size={16} className="mr-1" />
            Unknown
          </div>
        );
    }
  };

  const getBackgroundColor = (threatLevel: ThreatLevel) => {
    switch (threatLevel) {
      case 'safe':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'suspicious':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'dangerous':
        return 'bg-red-50 dark:bg-red-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-800';
    }
  };

  const getBorderColor = (threatLevel: ThreatLevel) => {
    switch (threatLevel) {
      case 'safe':
        return 'border-green-200 dark:border-green-800';
      case 'suspicious':
        return 'border-yellow-200 dark:border-yellow-800';
      case 'dangerous':
        return 'border-red-200 dark:border-red-800';
      default:
        return 'border-gray-200 dark:border-gray-700';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.url);
    showAlert('success', 'URL copied to clipboard', 2000);
  };

  return (
    <Card 
      className={`border-2 ${getBorderColor(result.threatLevel)} ${getBackgroundColor(result.threatLevel)} transition-all duration-300`}
    >
      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
        <div>
          <h3 className="text-lg font-semibold">Scan Results</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(result.timestamp).toLocaleString()}
          </p>
        </div>
        {getThreatBadge(result.threatLevel)}
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">URL Analyzed</h4>
          <div className="flex space-x-2">
            <button 
              onClick={copyToClipboard}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Copy URL"
            >
              <Copy size={16} />
            </button>
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Open URL"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
        <div className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded overflow-hidden overflow-ellipsis">
          <p className="break-all">{result.url}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2">Threat Analysis</h4>
        <p>{result.details.description}</p>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2">Risk Score</h4>
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              result.threatLevel === 'safe' 
                ? 'bg-green-500' 
                : result.threatLevel === 'suspicious' 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
            }`}
            style={{ width: `${result.details.score}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>Low Risk</span>
          <span>High Risk</span>
        </div>
      </div>
      
      {result.details.indicators.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Risk Indicators</h4>
          <ul className="space-y-1">
            {result.details.indicators.map((indicator, index) => (
              <li key={index} className="flex items-start">
                <AlertTriangle size={16} className="mr-2 mt-1 flex-shrink-0 text-yellow-500" />
                <span>{indicator}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" size="sm">
          Report False Positive
        </Button>
        {result.threatLevel !== 'safe' && (
          <Button variant="danger" size="sm">
            Block This URL
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ScanResult;