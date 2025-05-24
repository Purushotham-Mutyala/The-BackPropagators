import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Bell, Shield, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Card title="Theme Preferences">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Application Theme</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose between light and dark mode
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={theme === 'light' ? 'primary' : 'outline'}
                size="sm"
                leftIcon={<Sun size={16} />}
                onClick={() => theme !== 'light' && toggleTheme()}
              >
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'primary' : 'outline'}
                size="sm"
                leftIcon={<Moon size={16} />}
                onClick={() => theme !== 'dark' && toggleTheme()}
              >
                Dark
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Monitor size={16} />}
              >
                System
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <Card title="Notification Settings">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Phishing Alerts</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive notifications when dangerous links are detected
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Security Updates</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notified about new security features and updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Weekly Summaries</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive weekly reports about your scan activity
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>
        </div>
      </Card>
      
      <Card title="Security Settings">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto-Block Dangerous Links</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Automatically block access to links identified as dangerous
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Warn on Suspicious Links</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Show warnings before opening potentially suspicious links
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Safe Browsing Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable additional protections when browsing risky websites
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
          </div>
        </div>
      </Card>
      
      <Card title="Data Management">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Scan History Retention</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Choose how long to keep your scan history
            </p>
            <select className="block w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
              <option value="forever">Forever</option>
            </select>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-medium mb-1">Clear Data</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Remove all your scan history and saved data
            </p>
            <Button variant="danger" size="sm">
              Clear All Data
            </Button>
          </div>
        </div>
      </Card>
      
      <Card title="About ShieldSentry">
        <div className="space-y-4">
          <div className="flex items-center">
            <Shield size={40} className="text-teal-500 mr-4" />
            <div>
              <h3 className="text-xl font-bold">ShieldSentry</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Version 1.0.0</p>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            ShieldSentry uses advanced AI algorithms to detect and protect you from phishing attempts and 
            other online threats. Our mission is to make the internet safer for everyone.
          </p>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-4">
            <Button variant="outline" size="sm">
              Privacy Policy
            </Button>
            <Button variant="outline" size="sm">
              Terms of Service
            </Button>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-end">
        <Button variant="primary">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;