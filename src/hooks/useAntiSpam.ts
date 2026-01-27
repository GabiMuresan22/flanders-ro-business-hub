import { useState, useRef } from 'react';

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
  // Use useRef with initial value - no useEffect needed
  // This ensures the time is captured once when the hook is first called
  const mountTime = useRef(Date.now());

  const validateSubmission = async (): Promise<{ isValid: boolean; error?: string }> => {
    // Check honeypot - only if it has a value (bots fill hidden fields)
    if (honeypot && honeypot.trim().length > 0) {
      if (import.meta.env.DEV) console.warn('Anti-spam: Honeypot triggered');
      return { isValid: false, error: 'Spam detected. Please try again.' };
    }

    // Check minimum time - but be lenient (reduce to 2 seconds minimum)
    const timeSinceMount = Date.now() - mountTime.current;
    if (timeSinceMount < Math.min(minSubmitTime, 2000)) {
      if (import.meta.env.DEV) console.warn('Anti-spam: Form submitted too quickly', timeSinceMount);
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
