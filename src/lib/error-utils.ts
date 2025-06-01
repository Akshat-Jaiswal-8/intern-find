import { useCallback } from 'react';
import { toast } from 'sonner';

export function useErrorHandler() {
  const handleError = useCallback((error: Error, refetch?: () => void) => {
    toast.error('Something went wrong.', {
      description: error.message,
      action: refetch
        ? {
            onClick: refetch,
            label: 'Try again',
          }
        : undefined,
    });
  }, []);

  return { handleError };
}
