import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Link as LinkIcon,
  History,
  BarChart3,
  Globe2,
  Clock,
  AlertOctagon,
  Share2
} from 'lucide-react';

interface ScanResult {
  url: string;
  isPhishing: boolean;
  confidence: number;
  threats: string[];
  timestamp: string;
  details?: {
    domainAge?: string;
    sslCertificate?: boolean;
    suspiciousPatterns?: number;
    maliciousLinks?: number;
    dataCollection?: boolean;
  };
}

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [activeTab, setActiveTab] = useState<'scan' | 'history' | 'analytics'>('scan');

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    
    // Simulated API call
    setTimeout(() => {
      const result: ScanResult = {
        url,
        isPhishing: Math.random() > 0.5,
        confidence: Math.random() * 100,
        threats: [
          'Suspicious Domain',
          'Malicious JavaScript',
          'Data Collection Forms',
          'SSL Certificate Issues'
        ],
        timestamp: new Date().toISOString(),
        details: {
          domainAge: '2 months',
          sslCertificate: false,
          suspiciousPatterns: 3,
          maliciousLinks: 2,
          dataCollection: true
        }
      };
      
      setScanResult(result);
      setScanHistory(prev => [result, ...prev].slice(0, 10));
      setIsScanning(false);
    }, 2000);
  };

  const renderScanResult = (result: ScanResult, isHistoryItem: boolean = false) => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`bg-slate-800 rounded-xl p-6 shadow-xl ${!isHistoryItem ? 'mb-8' : ''}`}
    >
      <div className="flex items-start gap-4">
        {result.isPhishing ? (
          <div className="shrink-0">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        ) : (
          <div className="shrink-0">
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold">
              {result.isPhishing ? 'Phishing Detected!' : 'URL is Safe'}
            </h2>
            <button 
              className="text-slate-400 hover:text-white transition-colors"
              title="Share Result"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-slate-300 text-sm mb-4 break-all">{result.url}</p>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm text-slate-300">Confidence Score</span>
              <span className="text-sm font-medium">{Math.round(result.confidence)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  result.isPhishing ? 'bg-red-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          {result.details && (
            <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-850 rounded-lg">
              <div>
                <p className="text-sm text-slate-400 mb-1">Domain Age</p>
                <p className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  {result.details.domainAge}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">SSL Certificate</p>
                <p className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  {result.details.sslCertificate ? 'Valid' : 'Invalid'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Suspicious Patterns</p>
                <p className="font-medium flex items-center gap-2">
                  <AlertOctagon className="h-4 w-4 text-blue-400" />
                  {result.details.suspiciousPatterns} detected
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Malicious Links</p>
                <p className="font-medium flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-blue-400" />
                  {result.details.maliciousLinks} found
                </p>
              </div>
            </div>
          )}

          {result.isPhishing && (
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                Detected Threats
              </h3>
              <ul className="space-y-2">
                {result.threats.map((threat, index) => (
                  <li
                    key={index}
                    className="text-sm bg-slate-700 text-slate-300 px-3 py-2 rounded"
                  >
                    {threat}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-400">
              Scanned at: {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Phishing Detection</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Protect yourself from phishing attacks with our advanced AI detection system.
            Enter any suspicious URL to scan for potential threats.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-center space-x-2 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'scan'
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="h-4 w-4" />
              Scan
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'history'
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <History className="h-4 w-4" />
              History
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'scan' && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* URL Input Form */}
              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleScan}
                className="max-w-2xl mx-auto mb-12"
              >
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter URL to scan..."
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none placeholder-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isScanning}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5" />
                        Scan URL
                      </>
                    )}
                  </button>
                </div>
              </motion.form>

              {/* Current Scan Result */}
              {scanResult && renderScanResult(scanResult)}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-6">Recent Scans</h2>
              {scanHistory.length === 0 ? (
                <p className="text-center text-slate-400 py-8">No scan history available</p>
              ) : (
                <div className="space-y-4">
                  {scanHistory.map((result, index) => (
                    <div key={index}>{renderScanResult(result, true)}</div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-slate-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6">Scan Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-850 p-4 rounded-lg">
                    <h3 className="text-sm text-slate-400 mb-2">Total Scans</h3>
                    <p className="text-3xl font-bold">{scanHistory.length}</p>
                  </div>
                  <div className="bg-slate-850 p-4 rounded-lg">
                    <h3 className="text-sm text-slate-400 mb-2">Threats Detected</h3>
                    <p className="text-3xl font-bold text-red-500">
                      {scanHistory.filter(scan => scan.isPhishing).length}
                    </p>
                  </div>
                  <div className="bg-slate-850 p-4 rounded-lg">
                    <h3 className="text-sm text-slate-400 mb-2">Safe URLs</h3>
                    <p className="text-3xl font-bold text-emerald-500">
                      {scanHistory.filter(scan => !scan.isPhishing).length}
                    </p>
                  </div>
                  <div className="bg-slate-850 p-4 rounded-lg">
                    <h3 className="text-sm text-slate-400 mb-2">Average Confidence</h3>
                    <p className="text-3xl font-bold text-blue-500">
                      {scanHistory.length
                        ? Math.round(
                            scanHistory.reduce((acc, scan) => acc + scan.confidence, 0) /
                              scanHistory.length
                          )
                        : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;