import React, { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import { useScan } from '../../contexts/ScanContext';
import { useAlert } from '../../contexts/AlertContext';

const ScanForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const { scanLink, isScanning } = useScan();
  const { showAlert } = useAlert();

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!url.trim()) {
      showAlert('warning', 'Please enter a URL to scan', 3000);
      return;
    }
    
    // Add http if missing
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }
    
    // Validate URL format
    if (!isValidUrl(formattedUrl)) {
      showAlert('error', 'Please enter a valid URL', 3000);
      return;
    }
    
    try {
      await scanLink(formattedUrl);
    } catch (error) {
      showAlert('error', 'An error occurred while scanning the URL', 5000);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to scan (e.g., https://example.com)"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isScanning}
          leftIcon={!isScanning ? <AlertTriangle size={16} /> : undefined}
          className="whitespace-nowrap"
        >
          {isScanning ? 'Scanning...' : 'Scan for Threats'}
        </Button>
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <p>Enter any URL, email link, or suspicious text to analyze for phishing threats</p>
      </div>
    </form>
  );
};

export default ScanForm;