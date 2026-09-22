import React from 'react';
import { QueueSession, QueueStatus as QueueStatusType } from '@/types/queue';
import { QueueStatus } from './QueueStatus';
import { QueuePosition } from './QueuePosition';
import { QueueProgress } from './QueueProgress';
import { Button } from '@/components/common/Button';
import { ArrowRight, RefreshCw, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface QueueCardProps {
  session: QueueSession;
  eventTitle: string;
  venueName: string;
  eventDate: string;
  bannerImage: string;
  onLeaveQueue: () => void;
  onContinueToBooking: () => void;
  onRefresh: () => void;
  onTestSetStatus?: (status: QueueStatusType) => void;
  className?: string;
}

export const QueueCard: React.FC<QueueCardProps> = ({
  session,
  eventTitle,
  venueName,
  eventDate,
  bannerImage,
  onLeaveQueue,
  onContinueToBooking,
  onRefresh,
  onTestSetStatus,
  className,
}) => {
  const isReady = session.status === 'ready';
  const isWaiting = session.status === 'waiting';

  return (
    <div className={cn('bg-white rounded-3xl border border-charcoal-200 shadow-floating overflow-hidden max-w-xl mx-auto', className)}>
      {/* Event Mini Header */}
      <div className="relative h-28 sm:h-32 bg-charcoal-900 flex items-end p-4 sm:p-5">
        <img
          src={bannerImage}
          alt={eventTitle}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
            FairFlash Virtual Queue
          </span>
          <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-md mt-1">
            {eventTitle}
          </h2>
          <p className="text-xs text-charcoal-300">
            {venueName} • {eventDate}
          </p>
        </div>
      </div>

      {/* Main Queue Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Status Callout */}
        <QueueStatus status={session.status} position={session.position} />

        {/* Waiting Specific Data */}
        {isWaiting && (
          <>
            <QueueProgress
              currentPosition={session.position}
              initialPosition={session.initialPosition}
            />
            <QueuePosition
              position={session.position}
              estimatedWaitSeconds={session.estimatedWaitSeconds}
            />
          </>
        )}

        {/* Ready State CTA */}
        {isReady && (
          <div className="text-center space-y-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={onContinueToBooking}
              className="py-4 text-base font-bold shadow-floating"
            >
              Select Your Tickets Now
            </Button>
            <p className="text-xs text-charcoal-500">
              Access token expires in <span className="font-semibold text-charcoal-800">10:00 minutes</span>
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-charcoal-100 text-xs">
          <button
            type="button"
            onClick={onLeaveQueue}
            className="flex items-center gap-1.5 text-charcoal-500 hover:text-red-600 transition-colors font-medium p-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Leave Queue</span>
          </button>

          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center gap-1.5 text-brand-600 hover:text-brand-700 transition-colors font-semibold p-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Position</span>
          </button>
        </div>

        {/* Fair Access Guarantee */}
        <div className="bg-surface-secondary rounded-xl p-3 flex items-center justify-center gap-2 text-[11px] text-charcoal-500 text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>FairFlash queue order is strictly cryptographically verified. No scalping bots.</span>
        </div>

        {/* Demo Simulator Controls for Reviewers & Designers */}
        {onTestSetStatus && (
          <div className="pt-4 border-t border-dashed border-charcoal-200">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-charcoal-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-brand-500" />
              <span>Demo State Switcher (Review Tool)</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => onTestSetStatus('waiting')}
                className="px-2 py-1 rounded bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 text-[11px] font-medium"
              >
                Waiting
              </button>
              <button
                type="button"
                onClick={() => onTestSetStatus('ready')}
                className="px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-medium"
              >
                Ready
              </button>
              <button
                type="button"
                onClick={() => onTestSetStatus('paused')}
                className="px-2 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-800 text-[11px] font-medium"
              >
                Paused
              </button>
              <button
                type="button"
                onClick={() => onTestSetStatus('expired')}
                className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800 text-[11px] font-medium"
              >
                Expired
              </button>
              <button
                type="button"
                onClick={() => onTestSetStatus('sold_out')}
                className="px-2 py-1 rounded bg-charcoal-200 hover:bg-charcoal-300 text-charcoal-800 text-[11px] font-medium"
              >
                Sold Out
              </button>
              <button
                type="button"
                onClick={() => onTestSetStatus('error')}
                className="px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 text-[11px] font-medium"
              >
                Error
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
