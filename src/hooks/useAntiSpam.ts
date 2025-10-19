import { useState, useEffect, useRef } from 'react';

interface AntiSpamResult {
  honeypotField: {
    name: string;
    value: string;
    onChange: (value: string) => void;
    style: React.CSSProperties;
    tabIndex: number;
  };
  validateSubmission: () => Promise<{ isValid: boolean; error?: string }>;
}

export const useAntiSpam = (minSubmitTime: number = 3000): AntiSpamResult => {
  const [honeypot, setHoneypot] = useState('');
  const mountTime = useRef(Date.now());

  useEffect(() => {
    mountTime.current = Date.now();
  }, []);

  const validateSubmission = async (): Promise<{ isValid: boolean; error?: string }> => {
    // Check honeypot
    if (honeypot) {
      console.warn('Anti-spam: Honeypot triggered');
      return { isValid: false, error: 'Spam detected. Please try again.' };
    }

    // Check minimum time
    const timeSinceMount = Date.now() - mountTime.current;
    if (timeSinceMount < minSubmitTime) {
      console.warn('Anti-spam: Form submitted too quickly');
      return { isValid: false, error: 'Please take your time to fill out the form.' };
    }

    return { isValid: true };
  };

  return {
    honeypotField: {
      name: 'website_url',
      value: honeypot,
      onChange: setHoneypot,
      tabIndex: -1,
      style: {
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
      },
    },
    validateSubmission,
  };
};
