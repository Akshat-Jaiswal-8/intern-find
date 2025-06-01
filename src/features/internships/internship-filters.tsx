import React, { useMemo } from 'react';
import type { Internship } from '@/types/internship.ts';

import {
  useInternshipFiltersState,
  type SortByType,
} from './useInternshipFiltersState';
import { useFilteredInternships } from './useFilteredInternships';

import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Input } from '@/components/ui/input.tsx';
import {
  Building2,
  Calendar,
  Crown,
  Home,
  MapPin,
  Search,
  SortAsc,
  SortDesc,
} from 'lucide-react';

interface InternshipFiltersProps {
  internships: Internship[];
  onFilteredChange: (filtered: Internship[]) => void;
}

export const InternshipFilters: React.FC<InternshipFiltersProps> = React.memo(
  ({ internships, onFilteredChange }) => {
    const {
      searchTerm,
      locationFilter,
      workFromHome,
      isPremium,
      sortBy,
      sortOrder,
      selectedCompanies,
      selectedDurations,
      clearAllFilters,
      handleSearchChange,
      handleLocationChange,
      toggleWorkFromHome,
      togglePremium,
      handleCompanyToggle,
      handleDurationToggle,
      handleSortByChange,
      toggleSortOrder,
      removeSearchFilter,
      removeLocationFilter,
      removeRemoteFilter,
      removePremiumFilter,
    } = useInternshipFiltersState();

    const uniqueCompanies = useMemo(() => {
      const companies = new Set(internships.map((i) => i.company_name));
      return Array.from(companies).sort();
    }, [internships]);

    const uniqueDurations = useMemo(() => {
      const durations = new Set(internships.map((i) => i.duration));
      return Array.from(durations).sort();
    }, [internships]);

    const filteredInternships = useFilteredInternships({
      internships,
      searchTerm,
      locationFilter,
      workFromHome,
      isPremium,
      sortBy,
      sortOrder,
      selectedCompanies,
      selectedDurations,
    });

    React.useEffect(() => {
      onFilteredChange(filteredInternships);
    }, [filteredInternships, onFilteredChange]);

    const activeFilterCount = useMemo(() => {
      let count = 0;
      if (searchTerm) count++;
      if (locationFilter) count++;
      if (workFromHome !== null) count++;
      if (isPremium !== null) count++;
      if (selectedCompanies.length > 0) count++;
      if (selectedDurations.length > 0) count++;
      return count;
    }, [
      searchTerm,
      locationFilter,
      workFromHome,
      isPremium,
      selectedCompanies,
      selectedDurations,
    ]);

    return (
      <div className='bg-card border-border space-y-4 rounded-lg border p-4 shadow-sm'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='relative'>
            <Search className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
            <Input
              placeholder='Search internships, companies, roles...'
              value={searchTerm}
              onChange={handleSearchChange}
              className='pl-10'
            />
          </div>
          <div className='relative'>
            <MapPin className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
            <Input
              placeholder='Filter by location...'
              value={locationFilter}
              onChange={handleLocationChange}
              className='pl-10'
            />
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <Button
            variant={workFromHome === true ? 'default' : 'outline'}
            size='sm'
            onClick={toggleWorkFromHome}
            className='gap-2'
          >
            <Home className='h-4 w-4' />
            Remote
          </Button>

          <Button
            variant={isPremium === true ? 'default' : 'outline'}
            size='sm'
            onClick={togglePremium}
            className='gap-2'
          >
            <Crown className='h-4 w-4' />
            Premium
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='gap-2'>
                <Building2 className='h-4 w-4' />
                Companies
                {selectedCompanies.length > 0 && (
                  <Badge
                    variant='secondary'
                    className='ml-1 h-5 w-5 p-0 text-xs'
                  >
                    {selectedCompanies.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='max-h-64 w-56 overflow-y-auto'>
              <DropdownMenuLabel>Select Companies</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniqueCompanies.map((company) => (
                <DropdownMenuCheckboxItem
                  key={company}
                  checked={selectedCompanies.includes(company)}
                  onCheckedChange={(checked) =>
                    handleCompanyToggle(company, checked)
                  }
                >
                  {company}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='gap-2'>
                <Calendar className='h-4 w-4' />
                Duration
                {selectedDurations.length > 0 && (
                  <Badge
                    variant='secondary'
                    className='ml-1 h-5 w-5 p-0 text-xs'
                  >
                    {selectedDurations.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Duration</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {uniqueDurations.map((duration) => (
                <DropdownMenuCheckboxItem
                  key={duration}
                  checked={selectedDurations.includes(duration)}
                  onCheckedChange={(checked) =>
                    handleDurationToggle(duration, checked)
                  }
                >
                  {duration}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='gap-2'>
                {sortOrder === 'asc' ? (
                  <SortAsc className='h-4 w-4' />
                ) : (
                  <SortDesc className='h-4 w-4' />
                )}
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleSortByChange('posted' as SortByType)}
              >
                Posted Date{' '}
                {sortBy === 'posted' && (sortOrder === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortByChange('stipend' as SortByType)}
              >
                Stipend{' '}
                {sortBy === 'stipend' && (sortOrder === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortByChange('deadline' as SortByType)}
              >
                Deadline{' '}
                {sortBy === 'deadline' && (sortOrder === 'desc' ? '↓' : '↑')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleSortOrder}>
                {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {activeFilterCount > 0 && (
            <Button
              variant='ghost'
              size='sm'
              onClick={clearAllFilters}
              className='text-muted-foreground hover:text-foreground'
            >
              Clear all ({activeFilterCount})
            </Button>
          )}
        </div>

        {activeFilterCount > 0 && (
          <div className='border-border flex flex-wrap gap-2 border-t pt-2'>
            {searchTerm && (
              <Badge variant='secondary' className='gap-1'>
                Search: {searchTerm}
                <button
                  onClick={removeSearchFilter}
                  className='hover:bg-muted ml-1 rounded-full'
                >
                  ×
                </button>
              </Badge>
            )}
            {locationFilter && (
              <Badge variant='secondary' className='gap-1'>
                Location: {locationFilter}
                <button
                  onClick={removeLocationFilter}
                  className='hover:bg-muted ml-1 rounded-full'
                >
                  ×
                </button>
              </Badge>
            )}
            {workFromHome === true && (
              <Badge variant='secondary' className='gap-1'>
                Remote
                <button
                  onClick={removeRemoteFilter}
                  className='hover:bg-muted ml-1 rounded-full'
                >
                  ×
                </button>
              </Badge>
            )}
            {isPremium === true && (
              <Badge variant='secondary' className='gap-1'>
                Premium
                <button
                  onClick={removePremiumFilter}
                  className='hover:bg-muted ml-1 rounded-full'
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}

        <div className='text-muted-foreground text-sm'>
          Showing {filteredInternships.length} of {internships.length}{' '}
          internships
        </div>
      </div>
    );
  },
);

InternshipFilters.displayName = 'InternshipFilters';
