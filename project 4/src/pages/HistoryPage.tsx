import React, { useState } from 'react';
import { Search, Trash2, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useScan } from '../contexts/ScanContext';
import { ThreatLevel } from '../contexts/ScanContext';

const HistoryPage: React.FC = () => {
  const { scanHistory } = useScan();
  const [filter, setFilter] = useState<ThreatLevel | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = scanHistory
    .filter(scan => filter === 'all' || scan.threatLevel === filter)
    .filter(scan => scan.url.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search scan history..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'safe' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('safe')}
            >
              Safe
            </Button>
            <Button 
              variant={filter === 'suspicious' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('suspicious')}
            >
              Suspicious
            </Button>
            <Button 
              variant={filter === 'dangerous' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('dangerous')}
            >
              Dangerous
            </Button>
          </div>
        </div>
      </Card>
      
      {filteredHistory.length > 0 ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">URL</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk Score</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredHistory.map((scan, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(scan.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm max-w-xs truncate">
                      <a href={scan.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                        {scan.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {scan.details.score}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No scan history found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm || filter !== 'all' 
                ? 'No results match your search criteria.' 
                : 'You haven\'t scanned any URLs yet.'}
            </p>
            {searchTerm || filter !== 'all' ? (
              <Button variant="outline" onClick={() => { setSearchTerm(''); setFilter('all'); }}>
                Clear Filters
              </Button>
            ) : (
              <Button variant="primary" onClick={() => window.location.href = '/scan'}>
                Scan a URL
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default HistoryPage;