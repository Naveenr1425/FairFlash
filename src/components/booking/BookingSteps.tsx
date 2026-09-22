import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export type BookingStepId = 'queue' | 'tickets' | 'checkout' | 'confirmation';

export interface BookingStepsProps {
  currentStep: BookingStepId;
  hasQueue?: boolean;
  className?: string;
}

export const BookingSteps: React.FC<BookingStepsProps> = ({
  currentStep,
  hasQueue = false,
  className,
}) => {
  const steps: { id: BookingStepId; label: string }[] = [
    ...(hasQueue ? [{ id: 'queue' as BookingStepId, label: 'Queue' }] : []),
    { id: 'tickets', label: 'Select Tickets' },
    { id: 'checkout', label: 'Checkout & Pay' },
    { id: 'confirmation', label: 'Confirmation' },
  ];

  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <nav aria-label="Booking Progress" className={cn('w-full py-4', className)}>
      <ol className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <li key={step.id} className="flex-1 flex items-center">
              <div className="flex flex-col items-center mx-auto text-center">
                {/* Step Circle */}
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200',
                    isCompleted && 'bg-emerald-600 text-white',
                    isCurrent && 'bg-brand-500 text-white ring-4 ring-brand-100',
                    !isCompleted && !isCurrent && 'bg-charcoal-100 text-charcoal-400'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                </div>

                {/* Step Label */}
                <span
                  className={cn(
                    'text-[11px] sm:text-xs mt-1.5 font-medium whitespace-nowrap',
                    isCurrent && 'font-bold text-brand-600',
                    isCompleted && 'text-charcoal-700',
                    !isCompleted && !isCurrent && 'text-charcoal-400'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 -mt-4 transition-colors',
                    idx < currentIndex ? 'bg-emerald-600' : 'bg-charcoal-200'
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
