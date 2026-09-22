import React from 'react';
import { cn } from '@/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  rounded = 'md',
  className,
  style,
  ...props
}) => {
  const roundings = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  };

  if (variant === 'card') {
    return (
      <div
        className={cn(
          'bg-white border border-charcoal-100 rounded-xl overflow-hidden p-4 flex flex-col gap-3 animate-pulse',
          className
        )}
        {...props}
      >
        <div className="w-full aspect-[16/9] bg-charcoal-200 rounded-lg" />
        <div className="h-4 bg-charcoal-200 rounded w-3/4 mt-1" />
        <div className="h-3 bg-charcoal-100 rounded w-1/2" />
        <div className="flex justify-between items-center pt-2 mt-auto">
          <div className="h-5 bg-charcoal-200 rounded w-1/3" />
          <div className="h-8 bg-charcoal-200 rounded w-24" />
        </div>
      </div>
    );
  }

  const customStyle: React.CSSProperties = {
    width: width ?? (variant === 'circular' ? '40px' : '100%'),
    height: height ?? (variant === 'text' ? '1em' : variant === 'circular' ? '40px' : '100px'),
    ...style,
  };

  return (
    <div
      className={cn(
        'bg-charcoal-200/70 animate-pulse',
        roundings[rounded],
        variant === 'circular' && 'rounded-full',
        className
      )}
      style={customStyle}
      aria-hidden="true"
      {...props}
    />
  );
};
