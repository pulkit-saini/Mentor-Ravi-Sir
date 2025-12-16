import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface RetryBoundaryProps {
  children: ReactNode;
  onRetry?: () => void;
  errorMessage?: string;
}

/**
 * Simple retry boundary for failed data fetches
 */
const RetryBoundary = ({ 
  children, 
  onRetry,
  errorMessage = "Failed to load data. Please try again."
}: RetryBoundaryProps) => {
  const [hasError, setHasError] = useState(false);

  const handleRetry = () => {
    setHasError(false);
    onRetry?.();
  };

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
        <p className="text-muted-foreground mb-4">{errorMessage}</p>
        <Button onClick={handleRetry} variant="default" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Retry
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};

export default RetryBoundary;
