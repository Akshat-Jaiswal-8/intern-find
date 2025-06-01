import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const Error = React.memo(
  ({ handleRefresh }: { handleRefresh: () => void }) => {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
        <div className='container mx-auto px-4 py-8'>
          <Card className='mx-auto max-w-md'>
            <CardContent className='flex flex-col items-center justify-center space-y-4 p-8'>
              <AlertCircle className='text-destructive h-12 w-12' />
              <h2 className='text-xl font-semibold'>Something went wrong</h2>
              <p className='text-muted-foreground text-center'>
                An error occurred while fetching internships. Please try again.
              </p>
              <Button onClick={handleRefresh} className='gap-2'>
                <RefreshCw className='h-4 w-4' />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  },
);
