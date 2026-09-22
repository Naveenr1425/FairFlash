import React from 'react';
import { cn } from '@/utils/cn';

export type BadgeVariant = 
  | 'default' 
  | 'brand' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'highDemand' 
  | 'flashSale'
  | 'outline';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'sm',
  children,
  className,
  dot = false,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const variants = {
    default: 'bg-charcoal-100 text-charcoal-700',
    brand: 'bg-brand-50 text-brand-600 border border-brand-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    highDemand: 'bg-red-600 text-white font-semibold shadow-sm',
    flashSale: 'bg-gradient-to-r from-amber-500 to-red-500 text-white font-semibold shadow-sm',
    outline: 'border border-charcoal-200 text-charcoal-600 bg-white',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-2 font-medium',
  };

  const dotColors = {
    default: 'bg-charcoal-400',
    brand: 'bg-brand-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    highDemand: 'bg-white animate-ping',
    flashSale: 'bg-amber-200 animate-pulse',
    outline: 'bg-charcoal-400',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />
      )}
      <span>{children}</span>
    </span>
  );
};
