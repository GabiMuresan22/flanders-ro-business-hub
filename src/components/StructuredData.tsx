import { useEffect } from 'react';

const SCRIPT_ID = 'structured-data';

interface StructuredDataProps {
  /** Single schema object or array of schemas (uses @graph when array) */
  data: object | object[];
}

const StructuredData = ({ data }: StructuredDataProps) => {
  useEffect(() => {
    const payload = Array.isArray(data)
      ? { '@context': 'https://schema.org', '@graph': data }
      : data;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(payload);
    script.id = SCRIPT_ID;

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) existing.remove();

    document.head.appendChild(script);

    return () => {
      const toRemove = document.getElementById(SCRIPT_ID);
      if (toRemove) toRemove.remove();
    };
  }, [data]);

  return null;
};

export default StructuredData;
