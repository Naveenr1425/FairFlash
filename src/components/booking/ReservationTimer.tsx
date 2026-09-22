import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatCountdown } from '@/utils/timeUtils';
import { cn } from '@/utils/cn';

export interface ReservationTimerProps {
  expiresAt: number; // UTC timestamp in ms
  onExpire: () => void;
  showWarningThresholdSeconds?: number;
  className?: string;
}

export const ReservationTimer: React.FC<ReservationTimerProps> = ({
  expiresAt,
  onExpire,
  showWarningThresholdSeconds = 120, // 2 minutes
  className,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(() =>
    Math.max(0, Math.floor((expiresAt - Date.now()) / 1000))
  );

  useEffect(() => {
    const checkTimer = () => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        onExpire();
      }
    };

    checkTimer();
    const interval = setInterval(checkTimer, 1000);
    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  const isWarning = secondsLeft <= showWarningThresholdSeconds;

  return (
    <div
      role="status"
      aria-live={isWarning ? 'assertive' : 'polite'}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300',
        isWarning
          ? 'bg-red-50 text-red-700 border border-red-200 animate-pulse'
          : 'bg-amber-50 text-amber-800 border border-amber-200',
        className
      )}
    >
      {isWarning ? (
        <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
      ) : (
        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      )}
      <span>
        Tickets held for <strong className="font-mono tabular-nums">{formatCountdown(secondsLeft)}</strong>
      </span>
    </div>
  );
};
