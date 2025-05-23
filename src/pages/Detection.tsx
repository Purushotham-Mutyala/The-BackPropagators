import React, { useState } from 'react';
import { Search, AlertTriangle, Check, ExternalLink, Copy, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Detection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | { safe: boolean; risk: string; details: string[] }>(null);

  const handleScan = () => {
    if (!url) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate scanning delay
    setTimeout(() => {
      const isSafe = !url.includes('phish') && !url.includes('scam') && !url.includes('free') && Math.random() > 0.3;
      
      const details = isSafe 
        ? [
            'No suspicious redirects detected',
            'Domain has valid SSL certificate',
            'No known malicious patterns found',
            'Not in phishing database'
          ]
        : [
            'Suspicious URL pattern detected',
            'Domain registered in the last 24 hours',
            'Mimics legitimate brand',
            'Contains obfuscated redirect code'
          ];
          
      setScanResult({
        safe: isSafe,
        risk: isSafe ? 'Low' : 'High',
        details
      });
      
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Link Detection</h1>
      </div>

      <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-lg font-semibold mb-4">Analyze URL for Threats</h2>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} size={18} />
            </div>
            <input
              type="text"
              placeholder="Enter a URL to scan (e.g., https://suspicious-website.com)"
              className={`pl-10 w-full rounded-md ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent py-2 px-4`}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            />
          </div>
          <button
            onClick={handleScan}
            disabled={!url || isScanning}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              !url || isScanning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isScanning ? 'Scanning...' : 'Scan URL'}
          </button>
        </div>

        {scanResult && (
          <div className="mt-6 animate-fadeIn">
            <div className={`p-4 rounded-md ${
              scanResult.safe 
                ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                : 'bg-red-100 dark:bg-red-900/30'
            } flex items-start`}>
              <div className={`p-2 rounded-full ${
                scanResult.safe 
                  ? 'bg-emerald-200 dark:bg-emerald-800' 
                  : 'bg-red-200 dark:bg-red-800'
              } mr-3`}>
                {scanResult.safe 
                  ? <Check className="text-emerald-700 dark:text-emerald-300" size={20} /> 
                  : <AlertTriangle className="text-red-700 dark:text-red-300" size={20} />
                }
              </div>
              <div>
                <h3 className={`font-medium ${
                  scanResult.safe 
                    ? 'text-emerald-800 dark:text-emerald-300' 
                    : 'text-red-800 dark:text-red-300'
                }`}>
                  {scanResult.safe ? 'URL appears to be safe' : 'Potential threat detected'}
                </h3>
                <p className={`mt-1 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Risk level: <span className={`font-medium ${
                    scanResult.risk === 'Low' 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>{scanResult.risk}</span>
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Scan Details</h4>
              <ul className="space-y-2">
                {scanResult.details.map((detail, index) => (
                  <li key={index} className="flex items-center">
                    <span className={`mr-2 ${
                      scanResult.safe 
                        ? 'text-emerald-500' 
                        : 'text-red-500'
                    }`}>•</span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {!scanResult.safe && (
              <div className="mt-4 p-4 border border-amber-200 dark:border-amber-800 rounded-md bg-amber-50 dark:bg-amber-900/30">
                <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Safety Recommendation</h4>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  We recommend avoiding this website. If you received this link in an email or message, do not provide any personal information or login credentials.
                </p>
                <div className="mt-3 flex items-center">
                  <button className="text-xs bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full flex items-center mr-2">
                    <ExternalLink size={12} className="mr-1" />
                    Report URL
                  </button>
                  <button className="text-xs bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full flex items-center">
                    <Copy size={12} className="mr-1" />
                    Copy Report
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={`mt-6 p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className="font-medium mb-2">Example Threat URLs for Testing</h3>
          <p className="text-sm mb-3">Click on any of these examples to test our detection system:</p>
          <div className="space-y-2">
            <button 
              className="flex items-center text-sm hover:underline text-blue-500"
              onClick={() => setUrl('https://fake-phishing-paypal.com/secure')}
            >
              <ArrowRight size={14} className="mr-1" />
              fake-phishing-paypal.com/secure
            </button>
            <button 
              className="flex items-center text-sm hover:underline text-blue-500"
              onClick={() => setUrl('https://free-prize-winner.com/claim-now')}
            >
              <ArrowRight size={14} className="mr-1" />
              free-prize-winner.com/claim-now
            </button>
            <button 
              className="flex items-center text-sm hover:underline text-blue-500"
              onClick={() => setUrl('https://microsoft365-scam-login.net')}
            >
              <ArrowRight size={14} className="mr-1" />
              microsoft365-scam-login.net
            </button>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-lg font-semibold mb-4">Bulk URL Check</h2>
        <p className="text-sm mb-4">Upload a CSV file with URLs to scan multiple links at once.</p>
        
        <div className={`border-2 border-dashed ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-8 text-center`}>
          <div className="flex flex-col items-center justify-center">
            <Upload className={`mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={32} />
            <p className="mb-2 font-medium">Drag and drop a CSV file here</p>
            <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">Or click to browse files</p>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-medium">
              Browse Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Upload icon component
const Upload = ({ className, size }: { className?: string; size?: number }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
};

export default Detection;