import React from 'react';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  actionLabel?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an issue loading this information. Please check your connection and try again.',
  onRetry,
  actionLabel = 'Try Again',
  className,
}) => {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-red-50/50 rounded-2xl border border-red-100 my-6',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-white border border-red-200 shadow-subtle flex items-center justify-center text-red-500 mb-4">
        <AlertCircle className="w-7 h-7 stroke-[1.5]" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-charcoal-900 mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="md"
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={onRetry}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
