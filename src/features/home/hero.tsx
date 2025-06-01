import React, { useMemo } from 'react';
import { Link } from 'react-router';

import { useErrorHandler } from '@/lib/error-utils';
import { useInternships } from '@/services/internships/useInternships';
import type { InternshipData } from '@/types/internship';

import { Error } from '@/components/error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';

export const Hero = React.memo(() => {
  const { internships, error, refetch, isRefetching, isLoading } =
    useInternships();
  const { handleError } = useErrorHandler();

  const computedStats = useMemo(() => {
    if (
      !internships ||
      !internships.internships_meta ||
      !internships.internship_ids
    ) {
      return null;
    }

    const { internships_meta, internship_ids }: InternshipData = internships;
    const actualInternshipCount = internship_ids.length;

    const profileCounts: Record<string, number> = {};
    let remoteCount = 0;

    Object.values(internships_meta).forEach((internship) => {
      if (internship.profile_name) {
        profileCounts[internship.profile_name] =
          (profileCounts[internship.profile_name] || 0) + 1;
      }
      if (internship.work_from_home) {
        remoteCount++;
      }
    });

    const sortedProfiles = Object.entries(profileCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([profile]) => profile);

    const topBadges: string[] = [];
    if (remoteCount > 0) {
      topBadges.push('Remote');
    }
    topBadges.push(
      ...sortedProfiles.slice(
        0,
        topBadges.length === 1 ? 4 : 5 - topBadges.length,
      ),
    );

    return {
      actualInternshipCount,
      topBadges,
    };
  }, [internships]);

  if (isLoading || isRefetching) {
    return (
      <div className='flex h-full min-h-[calc(100vh-var(--nav-height)-var(--footer-height))] flex-col items-center justify-center space-y-3'>
        <Skeleton className='h-20 w-full max-w-7xl rounded-xl' />
        <Skeleton className='h-20 w-full max-w-6xl rounded-xl' />
        <Skeleton className='h-20 w-full max-w-5xl rounded-xl' />
      </div>
    );
  }

  const handleRefresh = () => refetch();

  if (error) {
    handleError(error, refetch);
    return <Error handleRefresh={handleRefresh} />;
  }

  if (!computedStats) {
    return (
      <div className='flex h-full min-h-[calc(100vh-var(--nav-height)-var(--footer-height))] flex-col items-center justify-center'>
        <div className='px-4 py-12 text-center md:px-6'>
          No internship data available or data is in an unexpected format.
        </div>
      </div>
    );
  }

  const { topBadges } = computedStats;

  return (
    <main className='h-full min-h-[calc(100vh-var(--nav-height)-var(--footer-height))] flex-1'>
      <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-3'>
              <h1 className='font-poppins bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl lg:text-7xl'>
                Find Your Perfect Internship
              </h1>
              <p className='mx-auto max-w-3xl text-slate-600 md:text-xl dark:text-slate-300'>
                Discover thousands of internship opportunities from top
                companies. Powered by Internshala's comprehensive database to
                kickstart your career.
              </p>
            </div>

            <div className='w-full max-w-2xl space-y-4'>
              <div className='flex flex-wrap justify-center gap-2'>
                {topBadges.map((badge) => (
                  <Badge
                    key={badge}
                    variant='default'
                    className='bg-blue-100 text-blue-800'
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
              <div className='mx-auto'>
                <Button
                  variant={'outline'}
                  size='lg'
                  className='group h-12 border border-blue-500 bg-blue-50 px-8 text-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  asChild
                >
                  <div className='flex items-center gap-2'>
                    <Link to='/internships'>Browse Internships</Link>
                    <ArrowRight className='transition-all duration-200 group-hover:translate-x-1' />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
});

Hero.displayName = 'Hero';
