import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '@/types/event';
import { Button } from '@/components/common/Button';
import { formatDate } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import { ChevronLeft, ChevronRight, Zap, MapPin, Calendar } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface EventBannerProps {
  events: Event[];
  className?: string;
}

export const EventBanner: React.FC<EventBannerProps> = ({ events, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (events.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [events.length]);

  if (!events || events.length === 0) return null;

  const currentEvent = events[currentIndex] || events[0]!;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const handleCtaClick = () => {
    if (currentEvent.isHighDemand) {
      navigate(`/events/${currentEvent.id}/queue`);
    } else {
      navigate(`/events/${currentEvent.id}`);
    }
  };

  return (
    <div className={cn('relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-card my-4 sm:my-6', className)}>
      {/* Banner Container: 260px - 340px height */}
      <div className="relative h-[280px] sm:h-[340px] w-full bg-charcoal-900 flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentEvent.bannerImage}
            alt={currentEvent.title}
            className="w-full h-full object-cover opacity-45 scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-transparent to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full flex flex-col justify-center">
          <div className="max-w-xl">
            {/* Top Badges */}
            <div className="flex items-center gap-2 mb-2.5">
              {currentEvent.isFlashSale && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-red-600 px-2.5 py-0.5 rounded-full shadow-sm animate-pulse">
                  <Zap className="w-3 h-3 fill-current" />
                  FLASH SALE LIVE
                </span>
              )}
              <span className="text-[11px] font-semibold text-brand-300 uppercase tracking-wider bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                {currentEvent.category}
              </span>
            </div>

            {/* Event Title */}
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight line-clamp-2 drop-shadow-sm">
              {currentEvent.title}
            </h1>

            {/* Venue & Date Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-charcoal-200 mt-2.5 font-medium">
              <span className="flex items-center gap-1.5 text-brand-300">
                <Calendar className="w-4 h-4" />
                {formatDate(currentEvent.date)} • {currentEvent.time}
              </span>
              <span className="flex items-center gap-1.5 text-charcoal-300">
                <MapPin className="w-4 h-4" />
                {currentEvent.venue.name}, {currentEvent.city}
              </span>
            </div>

            {/* Price & Action */}
            <div className="flex items-center gap-4 mt-5">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCtaClick}
                className="shadow-floating font-bold px-6"
              >
                {currentEvent.isHighDemand ? 'Join Flash Queue' : 'Book Tickets'}
              </Button>
              <div className="text-white">
                <span className="text-[11px] text-charcoal-400 block font-medium">From</span>
                <span className="text-base sm:text-lg font-extrabold text-white">
                  {formatCurrency(currentEvent.startingPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        {events.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-charcoal-900/60 hover:bg-charcoal-900/90 text-white backdrop-blur-sm flex items-center justify-center transition-all border border-white/10"
              aria-label="Previous promotional slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-charcoal-900/60 hover:bg-charcoal-900/90 text-white backdrop-blur-sm flex items-center justify-center transition-all border border-white/10"
              aria-label="Next promotional slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Carousel Indicators */}
        {events.length > 1 && (
          <div className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5">
            {events.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  currentIndex === idx ? 'w-6 bg-brand-500' : 'w-2 bg-white/40 hover:bg-white/70'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
