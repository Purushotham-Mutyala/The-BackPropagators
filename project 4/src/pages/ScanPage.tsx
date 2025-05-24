import React from 'react';
import { Shield } from 'lucide-react';
import Card from '../components/ui/Card';
import ScanForm from '../components/scan/ScanForm';
import ScanResult from '../components/scan/ScanResult';
import { useScan } from '../contexts/ScanContext';

const ScanPage: React.FC = () => {
  const { currentScan, isScanning } = useScan();

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-teal-100 dark:bg-teal-900 mb-4">
            <Shield className="h-8 w-8 text-teal-600 dark:text-teal-300" />
          </div>
          <h1 className="text-2xl font-bold mb-2">URL Threat Scanner</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Scan any URL or link to check for phishing attempts, malware, and other security threats
          </p>
        </div>
        
        <ScanForm />
      </Card>
      
      {isScanning && (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Analyzing URL for potential threats...</p>
        </div>
      )}
      
      {!isScanning && currentScan && (
        <ScanResult result={currentScan} />
      )}
      
      {!isScanning && !currentScan && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mb-3">
                <span className="text-blue-600 dark:text-blue-300 font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold mb-1">Enter URL</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Paste any suspicious link you'd like to analyze</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mb-3">
                <span className="text-blue-600 dark:text-blue-300 font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold mb-1">AI Analysis</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Our AI engine scans for malicious patterns and threats</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mb-3">
                <span className="text-blue-600 dark:text-blue-300 font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold mb-1">Get Results</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive detailed analysis of potential security threats</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanPage;