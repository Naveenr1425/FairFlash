import React from 'react';
import { Event } from '@/types/event';
import { EventCard } from './EventCard';
import { Skeleton } from '@/components/common/Skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { cn } from '@/utils/cn';

export interface EventGridProps {
  events: Event[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  skeletonCount?: number;
  className?: string;
}

export const EventGrid: React.FC<EventGridProps> = ({
  events,
  isLoading = false,
  emptyTitle = 'No events found',
  emptyDescription = 'Try adjusting your search terms, category, or city filter to discover upcoming events.',
  skeletonCount = 6,
  className,
}) => {
  if (isLoading) {
    return (
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
          className
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <Skeleton key={idx} variant="card" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
        className
      )}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
