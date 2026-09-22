import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvents } from '@/hooks/useEvents';
import { EventGrid } from '@/components/events/EventGrid';
import { Search, X, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

const FILTER_PILLS = ['All', 'Concerts', 'Sports', 'Movies', 'Comedy', 'Theatre'];

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const { data, isLoading } = useEvents({
    search: queryParam || undefined,
    category: activeCategory === 'All' ? undefined : activeCategory,
  });

  const events = data?.events || [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-surface-primary py-8 sm:py-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header Form */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Search Events, Shows & Venues
          </h1>

          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-charcoal-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for concerts, artists, sports teams, movies..."
              className="w-full pl-12 pr-28 py-3.5 bg-white border border-charcoal-300 rounded-2xl text-sm sm:text-base text-charcoal-900 placeholder:text-charcoal-400 shadow-subtle focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-20 p-1.5 text-charcoal-400 hover:text-charcoal-600 rounded-full"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-colors"
            >
              Search
            </button>
          </form>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {FILTER_PILLS.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setActiveCategory(pill)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all',
                  activeCategory === pill
                    ? 'bg-brand-500 text-white shadow-2xs'
                    : 'bg-surface-secondary text-charcoal-700 hover:bg-charcoal-200/70'
                )}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between pb-4 border-b border-charcoal-200 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm sm:text-base font-bold text-charcoal-900">
              {queryParam
                ? `Results for "${queryParam}" (${events.length})`
                : `Showing all events (${events.length})`}
            </h2>
          </div>
          {activeCategory !== 'All' && (
            <span className="text-xs text-charcoal-500 font-medium">
              Filtered by: <strong>{activeCategory}</strong>
            </span>
          )}
        </div>

        {/* Results Grid */}
        <EventGrid
          events={events}
          isLoading={isLoading}
          emptyTitle={
            queryParam
              ? `No results found for "${queryParam}"`
              : 'No matching events found'
          }
          emptyDescription="Try searching for a different artist, category, or city."
        />
      </main>
    </div>
  );
};

export default SearchPage;
