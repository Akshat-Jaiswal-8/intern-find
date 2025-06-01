import { useMemo } from 'react';
import type { Internship } from '@/types/internship.ts';
import type { SortByType, SortOrderType } from './useInternshipFiltersState';

interface UseFilteredInternshipsProps {
  internships: Internship[];
  searchTerm: string;
  locationFilter: string;
  workFromHome: boolean | null;
  isPremium: boolean | null;
  sortBy: SortByType;
  sortOrder: SortOrderType;
  selectedCompanies: string[];
  selectedDurations: string[];
}

export function useFilteredInternships({
  internships,
  searchTerm,
  locationFilter,
  workFromHome,
  isPremium,
  sortBy,
  sortOrder,
  selectedCompanies,
  selectedDurations,
}: UseFilteredInternshipsProps) {
  const filteredInternships = useMemo(() => {
    let filtered = internships.filter((internship) => {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          internship.title.toLowerCase().includes(searchLower) ||
          internship.company_name.toLowerCase().includes(searchLower) ||
          internship.profile_name.toLowerCase().includes(searchLower) ||
          internship.location_names.some((loc) =>
            loc.toLowerCase().includes(searchLower),
          );

        if (!matchesSearch) return false;
      }

      if (locationFilter) {
        const locationLower = locationFilter.toLowerCase();
        const matchesLocation = internship.location_names.some((loc) =>
          loc.toLowerCase().includes(locationLower),
        );
        if (!matchesLocation) return false;
      }

      if (workFromHome !== null) {
        if (workFromHome && !internship.work_from_home) return false;
        if (!workFromHome && internship.work_from_home) return false;
      }

      if (isPremium !== null) {
        if (isPremium && !internship.is_premium) return false;
        if (!isPremium && internship.is_premium) return false;
      }

      if (selectedCompanies.length > 0) {
        if (!selectedCompanies.includes(internship.company_name)) return false;
      }

      if (selectedDurations.length > 0) {
        if (!selectedDurations.includes(internship.duration)) return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'posted':
          comparison = a.postedOnDateTime - b.postedOnDateTime;
          break;
        case 'stipend':
          comparison =
            (a.stipend?.salaryValue1 || 0) - (b.stipend?.salaryValue1 || 0);
          break;
        case 'deadline':
          const dateA = new Date(a.expires_at).getTime();
          const dateB = new Date(b.expires_at).getTime();
          comparison = dateA - dateB;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [
    internships,
    searchTerm,
    locationFilter,
    workFromHome,
    isPremium,
    sortBy,
    sortOrder,
    selectedCompanies,
    selectedDurations,
  ]);

  return filteredInternships;
}
