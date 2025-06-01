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
          <Skeleton className='mx-auto h-6 w-[600px] rounded-lg' />
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <StatSkeleton key={i} />
          ))}
        </div>

        <div className='space-y-4'>
          <Skeleton className='h-12 w-full rounded-lg' />
          <div className='flex flex-wrap gap-4'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-10 w-32 rounded-md' />
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        <div className='mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row'>
          <Skeleton className='h-6 w-48 rounded-md' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-9 w-20 rounded-md' />
            <div className='flex items-center gap-1'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className='h-8 w-8 rounded-md' />
              ))}
            </div>
            <Skeleton className='h-9 w-16 rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
});

InternshipListingLoadingSkeleton.displayName =
  'InternshipListingLoadingSkeleton';
