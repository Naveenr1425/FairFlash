import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvents } from '@/hooks/useEvents';
import { EventGrid } from '@/components/events/EventGrid';
import { EventFilters, FilterState } from '@/components/events/EventFilters';
import { ErrorState } from '@/components/common/ErrorState';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'date'>('featured');

  const initialCity = searchParams.get('city') || undefined;
  const initialCategory = searchParams.get('category') || undefined;
  const initialFlash = searchParams.get('onlyFlashSales') === 'true';

  const [filters, setFilters] = useState<FilterState>({
    city: initialCity,
    category: initialCategory,
    isFlashSale: initialFlash ? true : undefined,
  });

  // Keep filters in sync when URL changes
  useEffect(() => {
    setFilters({
      city: searchParams.get('city') || undefined,
      category: searchParams.get('category') || undefined,
      isFlashSale: searchParams.get('onlyFlashSales') === 'true' ? true : undefined,
    });
  }, [searchParams]);

  const { data, isLoading, isError, refetch } = useEvents({
    city: filters.city,
    category: filters.category,
    isFlashSale: filters.isFlashSale,
    isHighDemand: filters.isHighDemand,
    maxPrice: filters.maxPrice,
  });

  const rawEvents = data?.events || [];

  // Client sort
  const sortedEvents = [...rawEvents].sort((a, b) => {
    if (sortBy === 'price_low') return a.startingPrice - b.startingPrice;
    if (sortBy === 'price_high') return b.startingPrice - a.startingPrice;
    if (sortBy === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
    return 0; // default featured
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.city && newFilters.city !== 'All') params.set('city', newFilters.city);
    if (newFilters.category && newFilters.category !== 'All') params.set('category', newFilters.category);
    if (newFilters.isFlashSale) params.set('onlyFlashSales', 'true');
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setFilters({});
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="min-h-screen bg-surface-primary py-6 sm:py-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
              Explore All Events
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Live concerts, sports derbies, cinema premieres, and comedy specials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-surface-secondary border border-charcoal-200 text-charcoal-800"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-500" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-charcoal-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-surface-secondary border border-charcoal-200 rounded-xl px-3 py-2 text-xs font-semibold text-charcoal-800 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="date">Date: Earliest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout with Sidebar & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <EventFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                totalResults={sortedEvents.length}
              />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <div className="lg:hidden col-span-1">
              <EventFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                totalResults={sortedEvents.length}
              />
            </div>
          )}

          {/* Event Grid Section */}
          <section className="col-span-1 lg:col-span-3">
            {isError ? (
              <ErrorState
                title="Failed to load events"
                message="We encountered an error loading the event catalog. Please try again."
                onRetry={() => refetch()}
              />
            ) : (
              <EventGrid
                events={sortedEvents}
                isLoading={isLoading}
                emptyTitle="No events match your selected filters"
                emptyDescription="Try broadening your location, resetting category filters, or checking back soon."
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
