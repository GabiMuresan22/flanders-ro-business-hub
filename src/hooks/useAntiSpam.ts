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

    // For authenticated users, the time check is minimal (500ms) since auth itself is anti-spam
    // For anonymous flows, use a very lenient 1 second minimum to avoid false positives
    const timeSinceMount = Date.now() - mountTime.current;
    const effectiveMinTime = Math.min(minSubmitTime, 500); // Very lenient - 500ms minimum
    if (timeSinceMount < effectiveMinTime) {
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
