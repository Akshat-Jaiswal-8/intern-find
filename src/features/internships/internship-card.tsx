import React, { useMemo } from 'react';

import type { Internship } from '@/types/internship.ts';

import { Badge } from '@/components/ui/badge.tsx';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  Building2,
  Calendar,
  Clock,
  Crown,
  Globe,
  Home,
  MapPin,
  Users,
} from 'lucide-react';

interface InternshipCardProps {
  internship: Internship;
}

export const InternshipCard: React.FunctionComponent<InternshipCardProps> =
  React.memo(({ internship }) => {
    const formatStipend = useMemo(() => {
      if (!internship.stipend) return 'Not disclosed';
      return internship.stipend.salary;
    }, [internship.stipend]);

    const locationDisplay = useMemo(() => {
      if (internship.work_from_home) {
        return (
          <div className='flex items-center gap-1 text-sm text-green-600 dark:text-green-400'>
            <Home className='h-4 w-4' />
            <span>Remote</span>
          </div>
        );
      }

      if (internship.location_names.length === 0) {
        return (
          <div className='text-muted-foreground flex items-center gap-1 text-sm'>
            <MapPin className='h-4 w-4' />
            <span>Location not specified</span>
          </div>
        );
      }

      if (internship.location_names.length === 1) {
        return (
          <div className='text-muted-foreground flex items-center gap-1 text-sm'>
            <MapPin className='h-4 w-4' />
            <span>{internship.location_names[0]}</span>
            {internship.is_international_job && (
              <Globe className='h-3 w-3 text-blue-500' />
            )}
          </div>
        );
      }

      return (
        <div className='text-muted-foreground flex items-center gap-1 text-sm'>
          <MapPin className='h-4 w-4' />
          <span>{internship.location_names.length} locations</span>
          {internship.is_international_job && (
            <Globe className='h-3 w-3 text-blue-500' />
          )}
        </div>
      );
    }, [
      internship.work_from_home,
      internship.location_names,
      internship.is_international_job,
    ]);

    const badgeVariant = useMemo(() => {
      switch (internship.posted_by_label_type) {
        case 'success':
          return 'default';
        case 'info':
          return 'secondary';
        default:
          return 'outline';
      }
    }, [internship.posted_by_label_type]);

    return (
      <Card className='group bg-card/10 border-2 backdrop-blur-sm transition-all duration-300 hover:border-2 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500'>
        <CardContent>
          <Card className='transition-all duration-300 group-hover:scale-105'>
            <CardHeader className='pb-4'>
              <div className='flex items-start justify-between gap-4'>
                <div className='min-w-0 flex-1'>
                  <CardTitle className='text-foreground group-hover:text-primary line-clamp-2 text-lg font-semibold transition-colors'>
                    {internship.title}
                  </CardTitle>
                  <div className='mt-2 flex items-center gap-2'>
                    <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                      <Building2 className='h-4 w-4' />
                      <span className='font-medium'>
                        {internship.company_name}
                      </span>
                    </div>
                    {internship.is_premium && (
                      <Crown className='h-4 w-4 text-yellow-500' />
                    )}
                  </div>
                </div>
                <Badge variant={badgeVariant}>
                  {internship.posted_by_label}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className='space-y-4'>
              <div className='flex flex-wrap items-center gap-4'>
                {locationDisplay}
                {internship.office_days && (
                  <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                    <Calendar className='h-4 w-4' />
                    <span>{internship.office_days}</span>
                  </div>
                )}
              </div>

              <div className='flex flex-wrap items-center gap-4'>
                <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                  <Clock className='h-4 w-4' />
                  <span>{internship.duration}</span>
                </div>
                <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                  <Calendar className='h-4 w-4' />
                  <span>{internship.start_date}</span>
                </div>
              </div>

              <div className='bg-muted/50 rounded-lg p-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-muted-foreground text-sm font-medium'>
                    Stipend
                  </span>
                  <span className='text-lg font-semibold text-green-600 dark:text-green-400'>
                    {formatStipend}
                  </span>
                </div>
              </div>

              {internship.labels_app_in_card &&
                internship.labels_app_in_card.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {internship.labels_app_in_card.map((label, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {label}
                      </Badge>
                    ))}
                    {internship.job_segments.includes(
                      'internship_for_women',
                    ) && (
                      <Badge
                        variant='outline'
                        className='border-pink-200 bg-pink-50 text-xs text-pink-700 dark:border-pink-800 dark:bg-pink-950 dark:text-pink-300'
                      >
                        Women's Internship
                      </Badge>
                    )}
                  </div>
                )}

              {internship.application_status_message.to_show && (
                <div className='flex items-center gap-1 text-sm'>
                  <Users className='text-muted-foreground h-4 w-4' />
                  <span className='text-muted-foreground'>
                    {internship.application_status_message.message}
                  </span>
                </div>
              )}
            </CardContent>

            <CardFooter className='border-border/50 border-t pt-4'>
              <div className='flex w-full items-center justify-between'>
                <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                  <span>Apply by {internship.application_deadline}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    );
  });

InternshipCard.displayName = 'InternshipCard';
