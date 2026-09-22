import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '@/types/event';
import { Badge, BadgeVariant } from '@/components/common/Badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { MapPin, Calendar, Zap, Flame, ShieldAlert } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface EventCardProps {
  event: Event;
  onBook?: (id: string) => void;
  showAvailabilityBadge?: boolean;
  className?: string;
  priority?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onBook,
  showAvailabilityBadge = true,
  className,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBook) {
      onBook(event.id);
    } else {
      if (event.isHighDemand) {
        navigate(`/events/${event.id}/queue`);
      } else {
        navigate(`/events/${event.id}/booking`);
      }
    }
  };

  // Determine badge variant & label
  let badgeVariant: BadgeVariant = 'default';
  let badgeLabel = '';
  let badgeIcon: React.ReactNode = null;

  if (event.isFlashSale) {
    badgeVariant = 'flashSale';
    badgeLabel = 'FLASH SALE';
    badgeIcon = <Zap className="w-3 h-3 fill-current" />;
  } else if (event.isHighDemand) {
    badgeVariant = 'highDemand';
    badgeLabel = 'HIGH DEMAND';
    badgeIcon = <Flame className="w-3 h-3" />;
  } else {
    // Check ticket availability
    const hasFew = event.ticketTypes.some((t) => t.availability === 'few_tickets_left');
    const hasFast = event.ticketTypes.some((t) => t.availability === 'selling_fast');
    const isSoldOut = event.ticketTypes.every((t) => t.availability === 'sold_out');

    if (isSoldOut) {
      badgeVariant = 'danger';
      badgeLabel = 'SOLD OUT';
      badgeIcon = <ShieldAlert className="w-3 h-3" />;
    } else if (hasFew) {
      badgeVariant = 'warning';
      badgeLabel = 'FEW TICKETS LEFT';
    } else if (hasFast) {
      badgeVariant = 'brand';
      badgeLabel = 'SELLING FAST';
    }
  }

  return (
    <article
      onClick={handleCardClick}
      className={cn(
        'group bg-white rounded-2xl border border-charcoal-200/80 overflow-hidden shadow-subtle hover:shadow-floating hover:-translate-y-1 transition-all duration-200 flex flex-col cursor-pointer',
        className
      )}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-100">
        <img
          src={event.thumbnailImage}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {showAvailabilityBadge && badgeLabel ? (
            <Badge variant={badgeVariant} size="sm" className="shadow-sm flex items-center gap-1">
              {badgeIcon}
              <span>{badgeLabel}</span>
            </Badge>
          ) : <span />}

          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-900 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full shadow-subtle">
            {event.category}
          </span>
        </div>

        {/* City Overlay Chip */}
        <div className="absolute bottom-2.5 left-3">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white bg-charcoal-900/80 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-brand-400" />
            {event.city}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Date & Time */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 mb-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(event.date)}</span>
            <span className="text-charcoal-300">•</span>
            <span>{event.time}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-charcoal-900 line-clamp-2 leading-snug group-hover:text-brand-500 transition-colors">
            {event.title}
          </h3>

          {/* Venue */}
          <p className="text-xs text-charcoal-500 line-clamp-1 mt-1">
            {event.venue.name}
          </p>
        </div>

        {/* Bottom Price & CTA */}
        <div className="mt-4 pt-3 border-t border-charcoal-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-semibold text-charcoal-400 block tracking-wider">
              Starting from
            </span>
            <span className="text-base font-extrabold text-charcoal-900">
              {formatCurrency(event.startingPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleBookClick}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all shadow-2xs"
          >
            {event.isHighDemand ? 'Join Queue' : 'Book'}
          </button>
        </div>
      </div>
    </article>
  );
};
