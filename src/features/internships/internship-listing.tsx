import { useErrorHandler } from '@/lib/error-utils.ts';
import { useInternships } from '@/services/internships/useInternships.ts';
import type { Internship } from '@/types/internship.ts';
import React, { useEffect, useMemo, useState } from 'react';

import { InternshipCard } from '@/features/internships/internship-card.tsx';
import { InternshipFilters } from '@/features/internships/internship-filters.tsx';
import { InternshipListingLoadingSkeleton } from '@/features/internships/internship-listing-loading-skeleton.tsx';
import Stats from '@/features/internships/stats.tsx';

import { Error } from '@/components/error';
import { Card } from '@/components/ui/card.tsx';
import { AlertCircle } from 'lucide-react';

export const InternshipListing = React.memo(() => {
  const {
    internships: apiInternships,
    error,
    refetch,
    isRefetching,
    isLoading,
  } = useInternships();

  const { handleError } = useErrorHandler();

  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>(
    [],
  );

  const processedInternships = useMemo(() => {
    if (!apiInternships?.internships_meta || !apiInternships?.internship_ids) {
      return [];
    }
    return apiInternships.internship_ids.map(
      (id: number) => apiInternships.internships_meta[id.toString()],
    );
  }, [apiInternships]);

  useEffect(() => {
    setInternships(processedInternships);
    setFilteredInternships(processedInternships);
  }, [processedInternships]);

  const stats = useMemo(() => {
    if (internships.length === 0) return null;

    const stipendInternships = internships.filter(
      (i) => i.stipend?.salaryValue1,
    );
    const avgStipend =
      stipendInternships.length > 0
        ? stipendInternships.reduce(
            (sum, i) => sum + (i.stipend?.salaryValue1 || 0),
            0,
          ) / stipendInternships.length
        : 0;

    return {
      total: internships.length,
      remote: internships.filter((i) => i.work_from_home).length,
      premium: internships.filter((i) => i.is_premium).length,
      companies: new Set(internships.map((i) => i.company_name)).size,
      locations: new Set(internships.flatMap((i) => i.location_names)).size,
      avgStipend: Math.round(avgStipend),
    };
  }, [internships]);

  if (isLoading || isRefetching) {
    return <InternshipListingLoadingSkeleton />;
  }

  const handleRefresh = () => refetch();

  if (error) {
    handleError(error, refetch);
    return <Error handleRefresh={handleRefresh} />;
  }

  if (
    !apiInternships ||
    !apiInternships.internships_meta ||
    !apiInternships.internship_ids
  ) {
    return (
      <div className='flex h-full min-h-screen flex-col items-center justify-center'>
        <div className='px-4 py-12 text-center md:px-6'>
          No internship data available or data is in an unexpected format.
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto space-y-8 px-4 py-8'>
        <div className='space-y-4 text-center'>
          <h1 className='bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-4xl font-bold text-transparent md:text-5xl'>
            Explore Internships
          </h1>
          <p className='text-muted-foreground mx-auto max-w-2xl text-lg'>
            Discover amazing internship opportunities from top companies and
            kickstart your career journey.
          </p>
        </div>
        {stats && <Stats stats={stats} />}
        <div className='mt-20 grid grid-cols-1 gap-10 lg:grid-cols-3'>
          <div className='top-20 h-fit w-full md:sticky'>
            <InternshipFilters
              internships={internships}
              onFilteredChange={setFilteredInternships}
            />
          </div>
          <div className='w-full lg:col-span-2'>
            {filteredInternships.length === 0 ? (
              <Card className='p-12 text-center'>
                <div className='space-y-4'>
                  <AlertCircle className='text-muted-foreground mx-auto h-16 w-16' />
                  <h3 className='text-xl font-semibold'>
                    No internships found
                  </h3>
                  <p className='text-muted-foreground'>
                    Try adjusting your search criteria or filters to find more
                    opportunities.
                  </p>
                </div>
              </Card>
            ) : (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {filteredInternships.map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

InternshipListing.displayName = 'InternshipListing';
