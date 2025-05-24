import React, { createContext, useContext, useState, ReactNode } from 'react';
import { analyzeLinkForPhishing } from '../services/phishingDetection';

export type ThreatLevel = 'safe' | 'suspicious' | 'dangerous' | 'unknown';

export interface ScanResult {
  url: string;
  timestamp: Date;
  threatLevel: ThreatLevel;
  details: {
    score: number;
    indicators: string[];
    description: string;
  };
}

interface ScanContextProps {
  isScanning: boolean;
  scanHistory: ScanResult[];
  currentScan: ScanResult | null;
  scanLink: (url: string) => Promise<ScanResult>;
  clearCurrentScan: () => void;
}

const ScanContext = createContext<ScanContextProps | undefined>(undefined);

export const ScanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);

  const scanLink = async (url: string): Promise<ScanResult> => {
    setIsScanning(true);
    
    try {
      // Simulate API call to scan the link
      const result = await analyzeLinkForPhishing(url);
      
      // Update state with scan result
      setCurrentScan(result);
      setScanHistory(prev => [result, ...prev]);
      
      return result;
    } catch (error) {
      console.error('Error scanning link:', error);
      throw error;
    } finally {
      setIsScanning(false);
    }
  };

  const clearCurrentScan = () => {
    setCurrentScan(null);
  };

  return (
    <ScanContext.Provider value={{ 
      isScanning, 
      scanHistory, 
      currentScan, 
      scanLink,
      clearCurrentScan
    }}>
      {children}
    </ScanContext.Provider>
  );
};

export const useScan = (): ScanContextProps => {
  const context = useContext(ScanContext);
  if (context === undefined) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  return context;
};