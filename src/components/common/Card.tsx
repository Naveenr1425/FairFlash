import React from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'flat' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = 'bordered',
      padding = 'md',
      hoverable = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'bg-white rounded-xl transition-all duration-200 overflow-hidden';

    const variants = {
      flat: 'bg-surface-secondary border-0',
      elevated: 'shadow-card border border-charcoal-100',
      bordered: 'border border-charcoal-200 shadow-subtle',
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-6 sm:p-8',
    };

    const hoverStyles = hoverable
      ? 'hover:shadow-floating hover:-translate-y-0.5 hover:border-charcoal-300 cursor-pointer'
      : '';

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
