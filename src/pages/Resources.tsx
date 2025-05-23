import React from 'react';
import { ExternalLink, BookOpen, FileText, Play, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'guide' | 'video';
  url: string;
  readTime?: string;
  watchTime?: string;
}

const Resources: React.FC = () => {
  const { isDarkMode } = useTheme();

  const resources: Resource[] = [
    {
      id: 1,
      title: 'How to Identify Phishing Emails',
      description: 'Learn the common tactics used in phishing emails and how to spot them before becoming a victim.',
      type: 'article',
      url: '#',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Anatomy of a Phishing Attack',
      description: 'A detailed breakdown of how phishing attacks are structured and executed.',
      type: 'guide',
      url: '#',
      readTime: '10 min read'
    },
    {
      id: 3,
      title: 'Phishing in Social Media: What to Watch For',
      description: 'Social media platforms are becoming popular targets for phishing. Learn how to protect yourself.',
      type: 'video',
      url: '#',
      watchTime: '12 min video'
    },
    {
      id: 4,
      title: 'Protecting Your Business from Phishing Attacks',
      description: 'A comprehensive guide for organizations to implement anti-phishing measures.',
      type: 'guide',
      url: '#',
      readTime: '15 min read'
    },
    {
      id: 5,
      title: 'Latest Phishing Techniques in 2025',
      description: 'Stay updated on the newest phishing tactics being used by attackers this year.',
      type: 'article',
      url: '#',
      readTime: '8 min read'
    },
    {
      id: 6,
      title: 'SMS Phishing (Smishing) Explained',
      description: 'Learn about SMS-based phishing attacks and how to recognize them on your mobile device.',
      type: 'video',
      url: '#',
      watchTime: '7 min video'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'article':
        return <FileText size={18} />;
      case 'guide':
        return <BookOpen size={18} />;
      case 'video':
        return <Play size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'article':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'guide':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'video':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Educational Resources</h1>
      </div>

      <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="text-emerald-500" size={24} />
          <h2 className="text-lg font-semibold">Phishing Protection Learning Center</h2>
        </div>
        
        <p className="mb-6">
          Explore our curated collection of resources to learn how to protect yourself from phishing attacks. 
          Understanding these tactics is your first line of defense against cyber threats.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <div 
              key={resource.id} 
              className={`rounded-lg overflow-hidden border ${
                isDarkMode 
                  ? 'border-gray-700 hover:border-gray-600' 
                  : 'border-gray-200 hover:border-gray-300'
              } transition-colors`}
            >
              <div className={`h-2 ${
                resource.type === 'article' 
                  ? 'bg-blue-500' 
                  : resource.type === 'guide' 
                    ? 'bg-purple-500' 
                    : 'bg-red-500'
              }`}></div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                    <span className="ml-1 capitalize">{resource.type}</span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {resource.readTime || resource.watchTime}
                  </span>
                </div>
                <h3 className="font-medium mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {resource.description}
                </p>
                <a 
                  href={resource.url} 
                  className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Read more
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-lg font-semibold mb-4">Common Phishing Tactics</h2>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-medium mb-2">Email Spoofing</h3>
            <p className="text-sm">
              Attackers create emails that appear to come from legitimate sources by falsifying the sender's address.
              Always verify the sender's full email address and look for subtle misspellings.
            </p>
          </div>
          
          <div className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-medium mb-2">Fake Login Pages</h3>
            <p className="text-sm">
              Fraudulent websites that mimic legitimate login pages to steal credentials.
              Always check the URL and look for HTTPS before entering any login information.
            </p>
          </div>
          
          <div className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-medium mb-2">Urgent Action Required</h3>
            <p className="text-sm">
              Messages creating a false sense of urgency to pressure victims into acting quickly without thinking.
              Take your time and verify requests through official channels, especially if they involve sensitive information.
            </p>
          </div>
          
          <div className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="font-medium mb-2">Malicious Attachments</h3>
            <p className="text-sm">
              Files containing malware disguised as legitimate documents.
              Never open attachments from unknown sources and scan files before opening them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;