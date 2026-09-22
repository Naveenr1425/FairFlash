import React from 'react';
import { QueueStatus as QueueStatusType } from '@/types/queue';
import { CheckCircle2, PauseCircle, AlertCircle, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface QueueStatusProps {
  status: QueueStatusType;
  position: number;
  className?: string;
}

export const QueueStatus: React.FC<QueueStatusProps> = ({ status, position, className }) => {
  const statusConfigs = {
    waiting: {
      icon: <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />,
      title: "You're in line for tickets",
      description:
        "Please keep this window open. As soon as your turn arrives, you will be redirected automatically to ticket selection.",
      bgColor: 'bg-brand-50 border-brand-200',
    },
    ready: {
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />,
      title: "It's your turn!",
      description:
        "Your access pass is ready. You have 10 minutes to select your tickets and complete checkout.",
      bgColor: 'bg-emerald-50 border-emerald-200',
    },
    paused: {
      icon: <PauseCircle className="w-8 h-8 text-amber-600" />,
      title: 'Queue temporarily paused',
      description:
        'Ticket release is briefly paused to allow all customers currently checking out a smooth experience. Your spot is securely held.',
      bgColor: 'bg-amber-50 border-amber-200',
    },
    expired: {
      icon: <AlertCircle className="w-8 h-8 text-red-600" />,
      title: 'Queue session expired',
      description:
        'Your turn was held for 10 minutes but timed out due to inactivity. Please rejoin the queue to continue.',
      bgColor: 'bg-red-50 border-red-200',
    },
    sold_out: {
      icon: <XCircle className="w-8 h-8 text-charcoal-600" />,
      title: 'All tickets currently allocated',
      description:
        'All available tickets for this flash sale have been claimed. Any released tickets from unfinished checkouts will become available shortly.',
      bgColor: 'bg-charcoal-100 border-charcoal-200',
    },
    error: {
      icon: <AlertCircle className="w-8 h-8 text-red-600" />,
      title: 'Connection error',
      description:
        'We had trouble reaching the waiting room server. Click retry to reconnect without losing your spot.',
      bgColor: 'bg-red-50 border-red-200',
    },
  };

  const config = statusConfigs[status] || statusConfigs.waiting;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'p-5 sm:p-6 rounded-2xl border text-center flex flex-col items-center justify-center gap-3 transition-all',
        config.bgColor,
        className
      )}
    >
      <div className="shrink-0">{config.icon}</div>
      <h3 className="text-base sm:text-lg font-bold text-charcoal-900">
        {config.title} {status === 'waiting' && `#${position}`}
      </h3>
      <p className="text-xs sm:text-sm text-charcoal-600 max-w-md leading-relaxed">
        {config.description}
      </p>
    </div>
  );
};
