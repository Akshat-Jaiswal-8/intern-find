import { useQuery } from '@tanstack/react-query';
import { getInternships } from './api-interships';

export const useInternships = () => {
  const {
    isLoading,
    data: internships,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['internships'],
    queryFn: () => getInternships(),
  });
  return { internships, error, refetch, isRefetching, isLoading };
};
