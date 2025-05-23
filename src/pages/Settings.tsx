import React, { useState } from 'react';
import { Bell, Shield, Globe, Smartphone, Mail, ToggleLeft as Toggle, Save } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      browser: true,
      mobile: false
    },
    protection: {
      level: 'medium',
      autoBlock: true,
      scanDownloads: true,
      checkLinks: true,
      anonymizeData: false
    },
    scan: {
      email: true,
      web: true,
      social: true,
      messaging: false
    }
  });

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };

  const handleProtectionChange = (key: keyof typeof settings.protection) => {
    if (typeof settings.protection[key] === 'boolean') {
      setSettings({
        ...settings,
        protection: {
          ...settings.protection,
          [key]: !settings.protection[key]
        }
      });
    }
  };

  const handleProtectionLevelChange = (level: string) => {
    setSettings({
      ...settings,
      protection: {
        ...settings.protection,
        level
      }
    });
  };

  const handleScanChange = (key: keyof typeof settings.scan) => {
    setSettings({
      ...settings,
      scan: {
        ...settings.scan,
        [key]: !settings.scan[key]
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button 
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors flex items-center"
        >
          <Save size={18} className="mr-2" />
          Save Changes
        </button>
      </div>

      <div className={`rounded-lg shadow-sm overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button 
              className={`px-4 py-3 font-medium text-sm border-b-2 ${
                isDarkMode
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-emerald-500 text-emerald-600'
              }`}
            >
              General
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm border-b-2 border-transparent ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Account
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm border-b-2 border-transparent ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Privacy
            </button>
            <button 
              className={`px-4 py-3 font-medium text-sm border-b-2 border-transparent ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Advanced
            </button>
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Bell size={20} className="mr-2 text-gray-500" />
              <h2 className="text-lg font-medium">Notifications</h2>
            </div>
            
            <div className="space-y-3 ml-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Alerts</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive threat notifications via email</p>
                </div>
                <ToggleSwitch 
                  isActive={settings.notifications.email} 
                  onChange={() => handleNotificationChange('email')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Browser Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show alerts in your browser</p>
                </div>
                <ToggleSwitch 
                  isActive={settings.notifications.browser} 
                  onChange={() => handleNotificationChange('browser')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Mobile Alerts</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Send notifications to your mobile device</p>
                </div>
                <ToggleSwitch 
                  isActive={settings.notifications.mobile} 
                  onChange={() => handleNotificationChange('mobile')} 
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Shield size={20} className="mr-2 text-gray-500" />
              <h2 className="text-lg font-medium">Protection Settings</h2>
            </div>
            
            <div className="ml-8">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Protection Level</h3>
                <div className="flex space-x-3">
                  {['low', 'medium', 'high'].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleProtectionLevelChange(level)}
                      className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                        settings.protection.level === level
                          ? isDarkMode
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300 border'
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {settings.protection.level === 'low' && 'Minimal protection with fewer notifications.'}
                  {settings.protection.level === 'medium' && 'Balanced protection with moderate alerts.'}
                  {settings.protection.level === 'high' && 'Maximum protection with more frequent alerts.'}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-block Threats</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Automatically block high-risk links</p>
                  </div>
                  <ToggleSwitch 
                    isActive={settings.protection.autoBlock} 
                    onChange={() => handleProtectionChange('autoBlock')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Scan Downloads</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Check downloaded files for threats</p>
                  </div>
                  <ToggleSwitch 
                    isActive={settings.protection.scanDownloads} 
                    onChange={() => handleProtectionChange('scanDownloads')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Real-time Link Checking</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Check links as you browse</p>
                  </div>
                  <ToggleSwitch 
                    isActive={settings.protection.checkLinks} 
                    onChange={() => handleProtectionChange('checkLinks')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Anonymize Scan Data</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Remove personally identifiable information from scans</p>
                  </div>
                  <ToggleSwitch 
                    isActive={settings.protection.anonymizeData} 
                    onChange={() => handleProtectionChange('anonymizeData')} 
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <Globe size={20} className="mr-2 text-gray-500" />
              <h2 className="text-lg font-medium">Scan Sources</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
              <div className={`p-4 rounded-md border ${
                settings.scan.email
                  ? isDarkMode 
                    ? 'border-emerald-500 bg-emerald-900/20' 
                    : 'border-emerald-500 bg-emerald-50'
                  : isDarkMode
                    ? 'border-gray-700 bg-gray-800'
                    : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Mail size={20} className={
                      settings.scan.email
                        ? 'text-emerald-500'
                        : 'text-gray-500'
                    } />
                    <h3 className="ml-2 font-medium">Email</h3>
                  </div>
                  <ToggleSwitch 
                    isActive={settings.scan.email} 
                    onChange={() => handleScanChange('email')} 
                  />
                </div>
                <p className="text-sm mt-2 ml-7 text-gray-500 dark:text-gray-400">
                  Scan incoming emails for phishing attempts
                </p>
              </div>
              
              <div className={`p-4 rounded-md border ${
                settings.scan.web
                  ? isDarkMode 
                    ? 'border-emerald-500 bg-emerald-900/20' 
                    : 'border-emerald-500 bg-emerald-50'
                  : isDarkMode
                    ? 'border-gray-700 bg-gray-800'
                    : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Globe size={20} className={
                      settings.scan.web
                        ? 'text-emerald-500'
                        : 'text-gray-500'
                    } />
                    <h3 className="ml-2 font-medium">Web Browsing</h3>
                  </div>
                  <ToggleSwitch 
                    isActive={settings.scan.web} 
                    onChange={() => handleScanChange('web')} 
                  />
                </div>
                <p className="text-sm mt-2 ml-7 text-gray-500 dark:text-gray-400">
                  Check websites as you browse
                </p>
              </div>
              
              <div className={`p-4 rounded-md border ${
                settings.scan.social
                  ? isDarkMode 
                    ? 'border-emerald-500 bg-emerald-900/20' 
                    : 'border-emerald-500 bg-emerald-50'
                  : isDarkMode
                    ? 'border-gray-700 bg-gray-800'
                    : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Users size={20} className={
                      settings.scan.social
                        ? 'text-emerald-500'
                        : 'text-gray-500'
                    } />
                    <h3 className="ml-2 font-medium">Social Media</h3>
                  </div>
                  <ToggleSwitch 
                    isActive={settings.scan.social} 
                    onChange={() => handleScanChange('social')} 
                  />
                </div>
                <p className="text-sm mt-2 ml-7 text-gray-500 dark:text-gray-400">
                  Monitor social media links for threats
                </p>
              </div>
              
              <div className={`p-4 rounded-md border ${
                settings.scan.messaging
                  ? isDarkMode 
                    ? 'border-emerald-500 bg-emerald-900/20' 
                    : 'border-emerald-500 bg-emerald-50'
                  : isDarkMode
                    ? 'border-gray-700 bg-gray-800'
                    : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <MessageCircle size={20} className={
                      settings.scan.messaging
                        ? 'text-emerald-500'
                        : 'text-gray-500'
                    } />
                    <h3 className="ml-2 font-medium">Messaging Apps</h3>
                  </div>
                  <ToggleSwitch 
                    isActive={settings.scan.messaging} 
                    onChange={() => handleScanChange('messaging')} 
                  />
                </div>
                <p className="text-sm mt-2 ml-7 text-gray-500 dark:text-gray-400">
                  Scan messages for suspicious links
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ToggleSwitch component
interface ToggleProps {
  isActive: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ isActive, onChange }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
        isActive 
          ? 'bg-emerald-600' 
          : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isActive ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

// Simple Users icon component
const Users = ({ className, size }: { className?: string; size?: number }) => {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

// Simple MessageCircle icon component
const MessageCircle = ({ className, size }: { className?: string; size?: number }) => {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
};

export default Settings;