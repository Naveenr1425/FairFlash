import React from 'react';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { Ticket } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-surface-secondary/60 rounded-2xl border border-dashed border-charcoal-200 my-6',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-white border border-charcoal-200 shadow-subtle flex items-center justify-center text-brand-500 mb-4">
        {icon || <Ticket className="w-7 h-7 stroke-[1.5]" />}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-charcoal-900 mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-charcoal-500 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {actionLabel && onAction && (
            <Button variant="primary" size="md" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button variant="outline" size="md" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
