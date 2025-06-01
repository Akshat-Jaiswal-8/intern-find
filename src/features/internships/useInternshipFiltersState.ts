import { useCallback, useState } from 'react';

export type SortByType = 'posted' | 'stipend' | 'deadline';
export type SortOrderType = 'asc' | 'desc';

export function useInternshipFiltersState() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [workFromHome, setWorkFromHome] = useState<boolean | null>(null);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<SortByType>('posted');
  const [sortOrder, setSortOrder] = useState<SortOrderType>('desc');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setLocationFilter('');
    setWorkFromHome(null);
    setIsPremium(null);
    setSelectedCompanies([]);
    setSelectedDurations([]);
    setSortBy('posted');
    setSortOrder('desc');
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [],
  );

  const handleLocationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocationFilter(e.target.value);
    },
    [],
  );

  const toggleWorkFromHome = useCallback(() => {
    setWorkFromHome((prev) => (prev === true ? null : true));
  }, []);

  const togglePremium = useCallback(() => {
    setIsPremium((prev) => (prev === true ? null : true));
  }, []);

  const handleCompanyToggle = useCallback(
    (company: string, checked: boolean) => {
      if (checked) {
        setSelectedCompanies((prev) => [...prev, company]);
      } else {
        setSelectedCompanies((prev) => prev.filter((c) => c !== company));
      }
    },
    [],
  );

  const handleDurationToggle = useCallback(
    (duration: string, checked: boolean) => {
      if (checked) {
        setSelectedDurations((prev) => [...prev, duration]);
      } else {
        setSelectedDurations((prev) => prev.filter((d) => d !== duration));
      }
    },
    [],
  );

  const handleSortByChange = useCallback((newSortBy: SortByType) => {
    setSortBy(newSortBy);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const removeSearchFilter = useCallback(() => {
    setSearchTerm('');
  }, []);

  const removeLocationFilter = useCallback(() => {
    setLocationFilter('');
  }, []);

  const removeRemoteFilter = useCallback(() => {
    setWorkFromHome(null);
  }, []);

  const removePremiumFilter = useCallback(() => {
    setIsPremium(null);
  }, []);

  return {
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
  };
}
