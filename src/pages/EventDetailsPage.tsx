import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvent } from '@/hooks/useEvent';
import { useUiStore } from '@/store/uiStore';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { ErrorState } from '@/components/common/ErrorState';
import { Skeleton } from '@/components/common/Skeleton';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import {
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Users,
  Info,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useUiStore();

  const { data: event, isLoading, isError, refetch } = useEvent(id);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Skeleton height={320} rounded="lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton height={32} width="60%" />
            <Skeleton height={20} width="40%" />
            <Skeleton height={120} />
          </div>
          <Skeleton height={280} rounded="lg" />
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorState
          title="Event Not Found"
          message="We couldn't locate details for this event. It may have concluded or the URL is invalid."
          onRetry={() => refetch()}
        />
        <div className="text-center mt-4">
          <Link to="/" className="text-sm font-semibold text-brand-500 hover:underline">
            ← Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (event.isHighDemand) {
      navigate(`/events/${event.id}/queue`);
    } else {
      navigate(`/events/${event.id}/booking`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.title,
          text: `Check out ${event.title} on FairFlash!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      addToast({
        type: 'info',
        message: 'Event link copied to clipboard!',
      });
    }
  };

  return (
    <div className="min-h-screen bg-surface-primary pb-24 lg:pb-16">
      {/* Breadcrumbs & Back Bar */}
      <div className="border-b border-charcoal-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 text-xs font-semibold text-charcoal-600 hover:text-brand-500 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Event</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Banner Section */}
        <div className="relative rounded-3xl overflow-hidden bg-charcoal-900 aspect-[21/9] min-h-[260px] sm:min-h-[340px] shadow-card flex items-end">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="brand" size="md">
                {event.category}
              </Badge>
              {event.isFlashSale && (
                <Badge variant="flashSale" size="md" className="flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" />
                  Flash Sale Live
                </Badge>
              )}
              {event.isHighDemand && (
                <Badge variant="highDemand" size="md">
                  Queue Protected
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-sm">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-charcoal-200 mt-3 font-medium">
              <span className="flex items-center gap-1.5 text-brand-300">
                <Calendar className="w-4 h-4" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1.5 text-charcoal-300">
                <Clock className="w-4 h-4" />
                {event.time} {event.doorsOpen && `(Doors open: ${event.doorsOpen})`}
              </span>
              <span className="flex items-center gap-1.5 text-charcoal-300">
                <MapPin className="w-4 h-4" />
                {event.venue.name}, {event.city}
              </span>
            </div>
          </div>
        </div>

        {/* Content & Sticky Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left 2 Cols: Details, Highlights, Venue */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Event */}
            <section className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-subtle">
              <h2 className="text-lg font-bold text-charcoal-900 mb-3">
                About the Event
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>

              {/* Tags / Metadata Chips */}
              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-charcoal-100">
                {event.duration && (
                  <span className="text-xs bg-surface-secondary text-charcoal-600 px-3 py-1 rounded-full font-medium">
                    ⏱️ Duration: {event.duration}
                  </span>
                )}
                {event.ageRestriction && (
                  <span className="text-xs bg-surface-secondary text-charcoal-600 px-3 py-1 rounded-full font-medium">
                    🔞 Age: {event.ageRestriction}
                  </span>
                )}
                {event.language && (
                  <span className="text-xs bg-surface-secondary text-charcoal-600 px-3 py-1 rounded-full font-medium">
                    🗣️ Language: {event.language}
                  </span>
                )}
              </div>
            </section>

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <section className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-subtle">
                <h2 className="text-lg font-bold text-charcoal-900 mb-4">
                  Event Highlights & Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-secondary text-xs sm:text-sm font-medium text-charcoal-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Venue & Location Map Card */}
            <section className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-subtle">
              <h2 className="text-lg font-bold text-charcoal-900 mb-2">
                Venue Location
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-charcoal-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-500" />
                {event.venue.name}
              </p>
              <p className="text-xs text-charcoal-500 mt-0.5 pl-5">
                {event.venue.address}, {event.venue.city} {event.venue.landmark && `(${event.venue.landmark})`}
              </p>

              {/* Styled Mock Map Container */}
              <div className="mt-4 rounded-xl overflow-hidden border border-charcoal-200 bg-surface-secondary h-44 flex flex-col items-center justify-center text-center p-4 relative">
                <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-card mb-2 animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-charcoal-800">{event.venue.name}</span>
                <span className="text-[11px] text-charcoal-500">{event.city}</span>
              </div>
            </section>
          </div>

          {/* Right Col: Booking Action Box (Desktop Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl border border-charcoal-200 p-6 shadow-card space-y-6">
              <div>
                <span className="text-[11px] uppercase font-bold text-charcoal-400 block tracking-wider">
                  Tickets Starting From
                </span>
                <span className="text-2xl sm:text-3xl font-black text-charcoal-900">
                  {formatCurrency(event.startingPrice)}
                </span>
                <span className="text-xs text-charcoal-400 block mt-0.5">
                  Includes all applicable booking guarantees
                </span>
              </div>

              {/* Tiers summary */}
              <div className="space-y-2 pt-2 border-t border-charcoal-100">
                <span className="text-xs font-bold text-charcoal-700 uppercase tracking-wider block">
                  Available Tiers
                </span>
                {event.ticketTypes.map((tier) => (
                  <div
                    key={tier.id}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-charcoal-100 last:border-0"
                  >
                    <span className="font-medium text-charcoal-700">{tier.name}</span>
                    <span className="font-bold text-charcoal-900">{formatCurrency(tier.price)}</span>
                  </div>
                ))}
              </div>

              {/* High Demand Notice */}
              {event.isHighDemand && (
                <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-brand-900 flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>High-demand event.</strong> Booking utilizes the FairFlash queue room to ensure equal first-come access for genuine fans.
                  </p>
                </div>
              )}

              {/* Booking CTA */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleBookNow}
                className="py-4 text-base font-bold shadow-floating"
              >
                {event.isHighDemand ? 'Join FairFlash Queue' : 'Select Tickets'}
              </Button>

              {/* Trust badges */}
              <div className="space-y-2 pt-2 border-t border-charcoal-100 text-[11px] text-charcoal-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Genuine Barcoded Entry Passes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-charcoal-400" />
                  <span>Instant confirmation with digital wallet pass</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-charcoal-200 p-3.5 px-4 shadow-floating flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-charcoal-400 block">From</span>
          <span className="text-base font-extrabold text-charcoal-900">
            {formatCurrency(event.startingPrice)}
          </span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleBookNow}
          className="font-bold px-6 shrink-0 shadow-sm"
        >
          {event.isHighDemand ? 'Join Queue' : 'Book Tickets'}
        </Button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
