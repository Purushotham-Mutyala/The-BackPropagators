import React from 'react';
import Card from '../components/ui/Card';
import { AlertTriangle, ExternalLink, Shield, Mail, MessageSquare, Link, CreditCard, LockKeyhole } from 'lucide-react';

const EducationPage: React.FC = () => {
  const phishingTypes = [
    {
      id: 1,
      title: 'Email Phishing',
      icon: <Mail />,
      description: 'Attackers send fraudulent emails mimicking legitimate organizations to steal sensitive information.',
      examples: [
        'Emails claiming your account has been compromised',
        'Fake invoices or payment notifications',
        'Messages with urgent calls to action'
      ]
    },
    {
      id: 2,
      title: 'Spear Phishing',
      icon: <AlertTriangle />,
      description: 'Targeted attacks aimed at specific individuals or organizations, often using personalized information.',
      examples: [
        'Emails appearing to come from a colleague or boss',
        'Messages referencing specific projects or events',
        'Customized content based on social media information'
      ]
    },
    {
      id: 3,
      title: 'Smishing (SMS Phishing)',
      icon: <MessageSquare />,
      description: 'Phishing attempts via text messages, often containing malicious links or requesting personal information.',
      examples: [
        'Fake package delivery notifications',
        'Bank alerts requesting immediate action',
        'Prize or gift card notifications'
      ]
    },
    {
      id: 4,
      title: 'Vishing (Voice Phishing)',
      icon: <LockKeyhole />,
      description: 'Phone-based phishing where attackers impersonate legitimate organizations to extract information.',
      examples: [
        'Calls claiming to be from technical support',
        'Banking security alert calls',
        '"Government agency" calls threatening legal action'
      ]
    },
    {
      id: 5,
      title: 'Clone Phishing',
      icon: <Link />,
      description: 'Replicating legitimate messages but replacing links or attachments with malicious ones.',
      examples: [
        'Copies of legitimate emails with altered links',
        'Follow-up messages claiming to update previous communications',
        'Duplicate websites with subtle URL differences'
      ]
    },
    {
      id: 6,
      title: 'Pharming',
      icon: <CreditCard />,
      description: 'Redirecting users from legitimate websites to fraudulent ones to steal credentials.',
      examples: [
        'DNS poisoning attacks',
        'Compromised host files',
        'Man-in-the-middle attacks'
      ]
    }
  ];

  const safetyTips = [
    {
      title: 'Verify Sender Identity',
      description: 'Check email addresses carefully. Hover over links before clicking to see the actual URL destination.'
    },
    {
      title: 'Be Wary of Urgent Requests',
      description: 'Phishing often creates false urgency. Take time to verify requests through official channels.'
    },
    {
      title: 'Use Multi-Factor Authentication',
      description: 'Enable MFA on all important accounts to add an extra layer of security beyond passwords.'
    },
    {
      title: 'Keep Software Updated',
      description: 'Regular updates patch security vulnerabilities that phishers might exploit.'
    },
    {
      title: 'Use Secure Connections',
      description: 'Ensure websites use HTTPS (look for the lock icon) before entering any sensitive information.'
    },
    {
      title: 'Be Careful with Personal Information',
      description: 'Legitimate organizations rarely request sensitive information via email or text.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Phishing Education Center</h1>
        <p className="text-xl opacity-90">Learn how to identify and protect yourself from phishing attacks</p>
      </div>
      
      <Card title="What is Phishing?">
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Phishing is a type of social engineering attack often used to steal user data, including login credentials, 
            credit card numbers, and other sensitive information. It occurs when an attacker, masquerading as a trusted entity, 
            dupes a victim into opening an email, instant message, or text message.
          </p>
          <p>
            The recipient is then tricked into clicking a malicious link, which can lead to the installation of malware, 
            the freezing of the system as part of a ransomware attack, or the revealing of sensitive information.
          </p>
          <div className="flex items-center justify-center my-6">
            <Shield className="text-teal-500 h-16 w-16" />
          </div>
          <p>
            Phishing attacks have become increasingly sophisticated and often appear to come from legitimate sources. 
            They may use familiar branding, personalized information, and convincing narratives to gain trust.
          </p>
        </div>
      </Card>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Common Types of Phishing Attacks</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phishingTypes.map(type => (
          <Card key={type.id} className="h-full">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/50 rounded-full mr-3">
                <span className="text-teal-600 dark:text-teal-300">{type.icon}</span>
              </div>
              <h3 className="text-lg font-semibold">{type.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{type.description}</p>
            <div>
              <h4 className="font-medium mb-2">Common Examples:</h4>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                {type.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">How to Stay Safe</h2>
      
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyTips.map((tip, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </Card>
      
      <Card title="Warning Signs of Phishing">
        <div className="space-y-4">
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-lg">
            <h3 className="font-semibold flex items-center">
              <AlertTriangle className="mr-2 text-yellow-500" size={18} />
              Suspicious Sender Addresses
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Look for misspelled domain names, unusual subdomains, or personal email addresses claiming to be from businesses.
            </p>
          </div>
          
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-lg">
            <h3 className="font-semibold flex items-center">
              <AlertTriangle className="mr-2 text-yellow-500" size={18} />
              Poor Spelling and Grammar
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Legitimate organizations typically proofread their communications. Multiple errors can indicate a phishing attempt.
            </p>
          </div>
          
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-lg">
            <h3 className="font-semibold flex items-center">
              <AlertTriangle className="mr-2 text-yellow-500" size={18} />
              Mismatched or Suspicious URLs
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Hover over links before clicking. If the displayed text doesn't match the actual URL, or the URL looks unusual, don't click.
            </p>
          </div>
          
          <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-lg">
            <h3 className="font-semibold flex items-center">
              <AlertTriangle className="mr-2 text-yellow-500" size={18} />
              Requests for Sensitive Information
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Legitimate organizations rarely request passwords, SSNs, or financial details via email, text, or phone.
            </p>
          </div>
        </div>
      </Card>
      
      <Card 
        title="External Resources"
        footer={
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Always verify information from multiple sources and stay updated on the latest phishing techniques.
          </p>
        }
      >
        <ul className="space-y-3">
          <li>
            <a 
              href="https://www.cisa.gov/topics/avoiding-phishing-attacks" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink size={16} className="mr-2" />
              CISA: Avoiding Phishing Attacks
            </a>
          </li>
          <li>
            <a 
              href="https://www.ftc.gov/business-guidance/small-business/cybersecurity/phishing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink size={16} className="mr-2" />
              FTC: Phishing Guidance
            </a>
          </li>
          <li>
            <a 
              href="https://www.consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink size={16} className="mr-2" />
              How to Recognize and Avoid Phishing Scams
            </a>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default EducationPage;