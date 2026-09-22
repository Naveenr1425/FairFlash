import React from 'react';
import { Users, Clock } from 'lucide-react';
import { formatWaitTime } from '@/utils/timeUtils';
import { cn } from '@/utils/cn';

export interface QueuePositionProps {
  position: number;
  estimatedWaitSeconds: number;
  className?: string;
}

export const QueuePosition: React.FC<QueuePositionProps> = ({
  position,
  estimatedWaitSeconds,
  className,
}) => {
  return (
    <div className={cn('grid grid-cols-2 gap-3 sm:gap-4', className)}>
      {/* Position in line */}
      <div className="bg-surface-secondary/70 border border-charcoal-200 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-charcoal-500 mb-1">
          <Users className="w-3.5 h-3.5 text-brand-500" />
          <span>Ahead of You</span>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-charcoal-900 font-mono">
          {position}
        </div>
        <span className="text-[11px] text-charcoal-400">people in line</span>
      </div>

      {/* Estimated wait time */}
      <div className="bg-surface-secondary/70 border border-charcoal-200 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-charcoal-500 mb-1">
          <Clock className="w-3.5 h-3.5 text-brand-500" />
          <span>Estimated Wait</span>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-charcoal-900 font-mono truncate">
          {formatWaitTime(estimatedWaitSeconds)}
        </div>
        <span className="text-[11px] text-charcoal-400">updates live</span>
      </div>
    </div>
  );
};
