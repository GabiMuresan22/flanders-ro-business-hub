import React from 'react';

const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse" aria-busy="true" aria-live="polite">
      <div className="flex justify-center mb-4">
        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      <span className="sr-only">Loading category information...</span>
    </div>
  );
};

export default CategoryCardSkeleton;
