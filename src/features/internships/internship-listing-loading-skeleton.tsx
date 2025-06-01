import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => <Skeleton className='h-80 w-full rounded-xl' />;
const StatSkeleton = () => <Skeleton className='h-32 w-full rounded-xl' />;

export const InternshipListingLoadingSkeleton = React.memo(() => {
  return (
    <div className='min-h-screen'>
      <div className='container mx-auto space-y-8 px-4 py-8'>
        <div className='space-y-4 text-center'>
          <Skeleton className='mx-auto h-14 w-96 rounded-xl' />
          <Skeleton className='mx-auto h-6 w-80 rounded-lg' />
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <StatSkeleton key={i} />
          ))}
        </div>

        <div className='grid w-full grid-cols-1 gap-10 lg:grid-cols-3'>
          <Skeleton className='h-fit w-full lg:h-80' />
          <div className='col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2'>
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

InternshipListingLoadingSkeleton.displayName =
  'InternshipListingLoadingSkeleton';
