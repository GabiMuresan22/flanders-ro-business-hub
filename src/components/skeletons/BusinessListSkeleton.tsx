import React from 'react';

const BusinessListSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-live="polite">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="h-7 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-gray-200 rounded"></div>
              <div className="h-9 w-9 bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading your businesses...</span>
    </div>
  );
};

export default BusinessListSkeleton;
