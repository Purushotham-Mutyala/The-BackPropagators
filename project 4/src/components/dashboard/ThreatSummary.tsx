import React from 'react';
import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';

interface ThreatSummaryProps {
  safeCount: number;
  suspiciousCount: number;
  dangerousCount: number;
}

const ThreatSummary: React.FC<ThreatSummaryProps> = ({
  safeCount,
  suspiciousCount,
  dangerousCount,
}) => {
  const totalScans = safeCount + suspiciousCount + dangerousCount;
  
  return (
    <Card title="Threat Summary" subtitle="Overview of your scan results">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full mb-3">
            <Shield className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <h4 className="text-xl font-bold text-green-700 dark:text-green-300">{safeCount}</h4>
          <p className="text-green-600 dark:text-green-400">Safe Links</p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-800 rounded-full mb-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
          </div>
          <h4 className="text-xl font-bold text-yellow-700 dark:text-yellow-300">{suspiciousCount}</h4>
          <p className="text-yellow-600 dark:text-yellow-400">Suspicious Links</p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="p-3 bg-red-100 dark:bg-red-800 rounded-full mb-3">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
          </div>
          <h4 className="text-xl font-bold text-red-700 dark:text-red-300">{dangerousCount}</h4>
          <p className="text-red-600 dark:text-red-400">Dangerous Links</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium mb-2">Overall Protection</h4>
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
          <div className="h-full bg-green-500" style={{ width: `${(safeCount / totalScans) * 100}%` }}></div>
          <div className="h-full bg-yellow-500" style={{ width: `${(suspiciousCount / totalScans) * 100}%` }}></div>
          <div className="h-full bg-red-500" style={{ width: `${(dangerousCount / totalScans) * 100}%` }}></div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-600 dark:text-gray-400">Total Scans: {totalScans}</span>
          <span className="text-gray-600 dark:text-gray-400">
            Protected: {Math.round((safeCount / Math.max(totalScans, 1)) * 100)}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ThreatSummary;