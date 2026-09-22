import React from 'react';
import { cn } from '@/utils/cn';

export interface QueueProgressProps {
  currentPosition: number;
  initialPosition: number;
  className?: string;
}

export const QueueProgress: React.FC<QueueProgressProps> = ({
  currentPosition,
  initialPosition,
  className,
}) => {
  const safeInit = Math.max(1, initialPosition);
  const safeCurr = Math.max(0, currentPosition);
  const progressPercent = Math.min(100, Math.max(5, Math.round(((safeInit - safeCurr) / safeInit) * 100)));

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center text-xs font-semibold text-charcoal-500 mb-2">
        <span>Queue Progress</span>
        <span className="font-mono text-brand-600 font-bold">{progressPercent}%</span>
      </div>
      <div
        className="w-full h-3 bg-charcoal-100 rounded-full overflow-hidden p-0.5 border border-charcoal-200"
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Queue progression towards ticket selection"
      >
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-red-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
