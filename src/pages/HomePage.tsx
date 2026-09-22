import React, { useState } from 'react';
import { useEvents, useFeaturedBannerEvents } from '@/hooks/useEvents';
import { useUiStore } from '@/store/uiStore';
import { CategoryNav } from '@/components/navigation/CategoryNav';
import { EventBanner } from '@/components/events/EventBanner';
import { EventSection } from '@/components/events/EventSection';
import { ErrorState } from '@/components/common/ErrorState';
import { Search, MapPin, Zap } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { selectedCity, setSearchOpen, setLocationModalOpen } = useUiStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Fetch events for the selected city and category
  const {
    data: eventsData,
    isLoading: isEventsLoading,
    isError: isEventsError,
    refetch: refetchEvents,
  } = useEvents({
    city: selectedCity === 'All Cities' ? undefined : selectedCity,
    category: selectedCategory === 'All' ? undefined : selectedCategory,
  });

  const { data: featuredEvents = [], isLoading: isBannerLoading } = useFeaturedBannerEvents();

  const events = eventsData?.events || [];

  // Categorize events into sections
  const popularEvents = events.slice(0, 4);
  const trendingFlashSales = events.filter((e) => e.isHighDemand || e.isFlashSale);
  const recommendedEvents = events.slice(2, 6);
  const comingSoonEvents = events.filter((e) => e.status === 'upcoming').slice(0, 4);

  return (
    <div className="min-h-screen bg-surface-primary pb-12">
      {/* Category Navigation Bar */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Quick Search & Location Bar */}
        <div className="md:hidden pt-4 pb-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex-1 flex items-center gap-2 bg-surface-secondary border border-charcoal-200 text-charcoal-500 rounded-xl px-3.5 py-2.5 text-xs shadow-2xs text-left"
            >
              <Search className="w-4 h-4 text-brand-500 shrink-0" />
              <span className="truncate">Search artists, shows, movies...</span>
            </button>
            <button
              type="button"
              onClick={() => setLocationModalOpen(true)}
              className="flex items-center gap-1 bg-surface-secondary border border-charcoal-200 text-charcoal-700 rounded-xl px-3 py-2.5 text-xs font-semibold shrink-0"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>{selectedCity}</span>
            </button>
          </div>
        </div>

        {/* Promotional Hero Banner (250-350px height) */}
        {!isBannerLoading && featuredEvents.length > 0 && (
          <EventBanner events={featuredEvents} />
        )}

        {isEventsError ? (
          <ErrorState
            title="Unable to load live events"
            message="We had trouble fetching live event listings for your selected area. Please retry."
            onRetry={() => refetchEvents()}
          />
        ) : (
          <>
            {/* 1. Popular Events Section */}
            <EventSection
              title={`Popular Events in ${selectedCity}`}
              subtitle="Top booking picks and highest rated performances this week"
              events={popularEvents}
              seeAllLink={`/events?city=${encodeURIComponent(selectedCity)}`}
              isLoading={isEventsLoading}
            />

            {/* 2. Trending Flash Sales Section */}
            {trendingFlashSales.length > 0 && (
              <div className="my-2 bg-gradient-to-r from-brand-50/70 via-red-50/40 to-transparent p-4 sm:p-6 rounded-3xl border border-brand-100">
                <EventSection
                  title="High-Demand & Flash Sales"
                  subtitle="Strict anti-scalper queue protection. Real-time access allocation."
                  badgeText="Live Flash Access"
                  events={trendingFlashSales}
                  seeAllLink="/events?onlyFlashSales=true"
                  isLoading={isEventsLoading}
                  className="py-2"
                />
              </div>
            )}

            {/* 3. Recommended For You */}
            <EventSection
              title="Recommended For You"
              subtitle="Hand-picked events based on popular genres in your city"
              events={recommendedEvents.length > 0 ? recommendedEvents : events}
              seeAllLink={`/events?category=${encodeURIComponent(selectedCategory)}`}
              isLoading={isEventsLoading}
            />

            {/* 4. Coming Soon */}
            <EventSection
              title="Coming Soon & Ticket Drops"
              subtitle="Upcoming concerts and major sports championships opening soon"
              events={comingSoonEvents}
              seeAllLink="/events"
              isLoading={isEventsLoading}
            />
          </>
        )}

        {/* Trust & Fair Guarantee Banner */}
        <section className="mt-12 bg-charcoal-900 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-floating">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-400 bg-white/10 px-3 py-1 rounded-full mb-3">
              <Zap className="w-3.5 h-3.5 fill-current" />
              FairFlash Guarantee
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
              Every fan deserves a fair chance at genuine tickets.
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-300 mt-2 leading-relaxed">
              We eliminate bots, scalper monopolies, and surprise checkout fees with cryptographic queues and official venue partnerships.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="px-6 py-3.5 rounded-xl text-sm font-bold bg-brand-500 text-white hover:bg-brand-600 transition-colors shadow-sm text-center"
            >
              Browse All Events
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
