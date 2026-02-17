'use client';

const SkeletonLoader = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-white/20 rounded-xl ${className}`}>
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
    </div>
  );
};

const WeatherSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section Skeleton */}
      <div className="text-center space-y-4">
        <SkeletonLoader className="h-6 w-48 mx-auto" />
        <SkeletonLoader className="h-20 w-32 mx-auto" />
        <SkeletonLoader className="h-5 w-40 mx-auto" />
        <SkeletonLoader className="h-4 w-56 mx-auto" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="p-4 rounded-xl glass">
            <SkeletonLoader className="h-5 w-5 mb-2" />
            <SkeletonLoader className="h-3 w-16 mb-1" />
            <SkeletonLoader className="h-4 w-12" />
          </div>
        ))}
      </div>

      {/* Hourly Forecast Skeleton */}
      <div className="space-y-4">
        <SkeletonLoader className="h-6 w-32" />
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex-shrink-0 p-4 rounded-xl glass min-w-[80px]">
              <SkeletonLoader className="h-3 w-8 mx-auto mb-2" />
              <SkeletonLoader className="h-8 w-8 mx-auto mb-2" />
              <SkeletonLoader className="h-4 w-6 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { SkeletonLoader, WeatherSkeleton };
