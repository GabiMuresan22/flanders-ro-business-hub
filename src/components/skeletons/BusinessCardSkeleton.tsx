import React from 'react';

const BusinessCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse" aria-busy="true" aria-live="polite">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
      </div>
      <span className="sr-only">Loading business information...</span>
    </div>
  );
};

export default BusinessCardSkeleton;
