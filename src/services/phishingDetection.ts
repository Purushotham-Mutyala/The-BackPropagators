import { ScanResult, ThreatLevel } from '../contexts/ScanContext';

// This is a mock AI-powered phishing detection service
// In a real application, this would connect to a backend API or use a library

// Common phishing indicators
const phishingIndicators = {
  domains: [
    'paypa1.com',
    'g00gle.com',
    'faceb00k.com',
    'amaz0n.com',
    'micros0ft.com',
    'appl3.com',
    'netfl1x.com',
    'bank0famerica.com',
    'wellsfarg0.com',
    'chas3bank.com'
  ],
  keywords: [
    'verify your account',
    'confirm your details',
    'urgent action required',
    'suspicious activity',
    'your account has been limited',
    'password reset',
    'security alert',
    'login attempt',
    'update your payment',
    'document shared with you'
  ],
  patterns: [
    'http://', // Non-HTTPS URL
    'bit.ly',
    'tinyurl.com',
    'goo.gl',
    't.co',
    'is.gd',
    'shorturl.at',
    'rebrand.ly',
    'ow.ly',
    'clck.ru'
  ]
};

/**
 * Simulates an AI-powered phishing detection analysis
 */
export const analyzeLinkForPhishing = async (url: string): Promise<ScanResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Parse the URL to get domain
  let domain = '';
  try {
    const urlObj = new URL(url);
    domain = urlObj.hostname;
  } catch (error) {
    domain = url;
  }
  
  // Check for known phishing domains
  const isKnownPhishingDomain = phishingIndicators.domains.some(d => 
    domain.toLowerCase().includes(d.toLowerCase())
  );
  
  // Check for suspicious URL patterns
  const hasUrlRedirection = phishingIndicators.patterns.some(p => 
    url.toLowerCase().includes(p.toLowerCase())
  );
  
  // Check for suspicious keywords in the URL
  const hasSuspiciousKeywords = phishingIndicators.keywords.some(k => 
    url.toLowerCase().includes(k.toLowerCase().replace(/ /g, ''))
  );
  
  // Generate a risk score (0-100)
  let riskScore = 0;
  
  if (isKnownPhishingDomain) {
    riskScore += 70;
  }
  
  if (hasUrlRedirection) {
    riskScore += 30;
  }
  
  if (hasSuspiciousKeywords) {
    riskScore += 20;
  }
  
  // Add some randomness for demo purposes
  riskScore += Math.floor(Math.random() * 15);
  
  // Cap the score at 100
  riskScore = Math.min(riskScore, 100);
  
  // Determine threat level
  let threatLevel: ThreatLevel = 'safe';
  let description = 'This link appears to be safe. No phishing indicators detected.';
  const indicators: string[] = [];
  
  if (riskScore >= 70) {
    threatLevel = 'dangerous';
    description = 'This link is likely a phishing attempt. We strongly recommend not visiting this website.';
    
    if (isKnownPhishingDomain) {
      indicators.push('Known phishing domain detected');
    }
    if (hasUrlRedirection) {
      indicators.push('Suspicious URL redirection pattern');
    }
    if (hasSuspiciousKeywords) {
      indicators.push('Contains suspicious keywords commonly used in phishing');
    }
    indicators.push('Multiple high-risk factors detected');
  } else if (riskScore >= 30) {
    threatLevel = 'suspicious';
    description = 'This link has some suspicious characteristics. Proceed with caution.';
    
    if (hasUrlRedirection) {
      indicators.push('Uses URL shortener or redirection service');
    }
    if (hasSuspiciousKeywords) {
      indicators.push('Contains terms commonly associated with phishing attempts');
    }
    indicators.push('Some suspicious patterns detected');
  } else {
    // For demo purposes, sometimes mark random URLs as suspicious
    if (Math.random() < 0.2) {
      threatLevel = 'suspicious';
      description = 'This link has some minor suspicious characteristics. Likely safe but proceed with awareness.';
      indicators.push('Unusual URL structure');
      riskScore = Math.max(riskScore, 25);
    }
  }
  
  return {
    url,
    timestamp: new Date(),
    threatLevel,
    details: {
      score: riskScore,
      indicators,
      description
    }
  };
};