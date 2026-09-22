import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '@/types/event';
import { EventCard } from './EventCard';
import { Skeleton } from '@/components/common/Skeleton';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface EventSectionProps {
  title: string;
  subtitle?: string;
  events: Event[];
  seeAllLink?: string;
  isLoading?: boolean;
  badgeText?: string;
  className?: string;
}

export const EventSection: React.FC<EventSectionProps> = ({
  title,
  subtitle,
  events,
  seeAllLink,
  isLoading = false,
  badgeText,
  className,
}) => {
  return (
    <section className={cn('py-6 sm:py-8', className)}>
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2">
            {badgeText && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-sm">
                {badgeText}
              </span>
            )}
            <h2 className="text-lg sm:text-2xl font-extrabold text-charcoal-900 tracking-tight">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {seeAllLink && (
          <Link
            to={seeAllLink}
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-500 hover:text-brand-600 transition-colors shrink-0 group"
          >
            <span>See All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>

      {/* Grid or Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} variant="card" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {events.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
};
