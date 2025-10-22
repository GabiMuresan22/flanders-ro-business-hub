import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-romania-blue focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-romania-yellow"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
