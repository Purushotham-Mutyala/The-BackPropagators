import React from 'react';
import { Search, History as ClockHistory, ShieldCheck, Bell } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ThreatSummary from '../components/dashboard/ThreatSummary';
import { useScan } from '../contexts/ScanContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { scanHistory } = useScan();
  const navigate = useNavigate();

  // Calculate stats
  const safeCount = scanHistory.filter(scan => scan.threatLevel === 'safe').length;
  const suspiciousCount = scanHistory.filter(scan => scan.threatLevel === 'suspicious').length;
  const dangerousCount = scanHistory.filter(scan => scan.threatLevel === 'dangerous').length;
  const recentScans = scanHistory.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-4">
              <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Protection Status</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Active</h3>
            </div>
          </div>
        </Card>
        
        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full mr-4">
              <Search className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Scans</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{scanHistory.length}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-full mr-4">
              <Bell className="h-6 w-6 text-red-600 dark:text-red-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Threats Blocked</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{dangerousCount}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="transform transition-transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-full mr-4">
              <ClockHistory className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Scan</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {scanHistory.length > 0 
                  ? new Date(scanHistory[0].timestamp).toLocaleDateString() 
                  : 'Never'}
              </h3>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ThreatSummary 
            safeCount={safeCount}
            suspiciousCount={suspiciousCount}
            dangerousCount={dangerousCount}
          />
        </div>
        
        <Card 
          title="Quick Actions" 
          className="lg:col-span-1"
        >
          <div className="space-y-3">
            <Button 
              variant="primary" 
              className="w-full justify-start" 
              leftIcon={<Search size={16} />}
              onClick={() => navigate('/scan')}
            >
              Scan New Link
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              leftIcon={<ClockHistory size={16} />}
              onClick={() => navigate('/history')}
            >
              View Scan History
            </Button>
          </div>
        </Card>
      </div>
      
      <Card
        title="Recent Scans"
        headerAction={
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/history')}
          >
            View All
          </Button>
        }
      >
        {recentScans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">URL</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentScans.map((scan, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {new Date(scan.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm max-w-xs truncate">
                      {scan.url}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        scan.threatLevel === 'safe' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : scan.threatLevel === 'suspicious'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {scan.threatLevel.charAt(0).toUpperCase() + scan.threatLevel.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {scan.details.score}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 dark:text-gray-400">No scans yet. Try scanning a URL to see results here.</p>
            <Button 
              variant="primary" 
              className="mt-4"
              onClick={() => navigate('/scan')}
            >
              Scan Now
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;