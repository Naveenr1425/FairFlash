import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  min = 0,
  max = 10,
  onChange,
  disabled = false,
  ariaLabel = 'Select quantity',
  className,
}) => {
  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  return (
    <div
      className={cn('inline-flex items-center border border-charcoal-200 rounded-lg bg-white shadow-2xs', className)}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-charcoal-600 hover:text-charcoal-900 hover:bg-surface-secondary active:bg-charcoal-100 disabled:opacity-30 disabled:pointer-events-none rounded-l-lg transition-colors"
      >
        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>

      <div
        className="w-8 sm:w-10 text-center text-sm font-bold text-charcoal-900 select-none tabular-nums"
        aria-live="polite"
      >
        {value}
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-charcoal-600 hover:text-charcoal-900 hover:bg-surface-secondary active:bg-charcoal-100 disabled:opacity-30 disabled:pointer-events-none rounded-r-lg transition-colors"
      >
        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};
