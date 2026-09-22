import React, { useState, useEffect, useRef } from 'react';
import { useUiStore } from '@/store/uiStore';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { mockEvents } from '@/data/mockEvents';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';

const POPULAR_SEARCHES = [
  'A.R. Rahman Live',
  'CSK Chepauk Tickets',
  'Coldplay Mumbai',
  'IMAX 3D Movies',
  'Zakir Khan Standup',
  'Broadway Theatre',
];

const SEARCH_CATEGORIES = [
  { name: 'Concerts', icon: '🎵', slug: 'Concerts' },
  { name: 'Live Sports', icon: '🏏', slug: 'Sports' },
  { name: 'Movies & IMAX', icon: '🎬', slug: 'Movies' },
  { name: 'Stand-up Comedy', icon: '🎙️', slug: 'Comedy' },
  { name: 'Theatre & Plays', icon: '🎭', slug: 'Theatre' },
];

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setSearchOpen } = useUiStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredEvents = searchTerm.trim()
    ? mockEvents.filter(
        (e) =>
          e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSelectEvent = (id: string) => {
    setSearchOpen(false);
    navigate(`/events/${id}`);
  };

  const handleSearchSubmit = (query: string) => {
    if (!query.trim()) return;
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleCategoryClick = (category: string) => {
    setSearchOpen(false);
    navigate(`/events?category=${encodeURIComponent(category)}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Search events, venues, and artists"
    >
      {/* Search Input Bar */}
      <div className="border-b border-charcoal-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-charcoal-400 shrink-0" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchSubmit(searchTerm);
            }}
            className="flex-1"
          >
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for concerts, sports matches, movies, comedy shows, or venues..."
              className="w-full text-base sm:text-lg text-charcoal-900 placeholder:text-charcoal-400 bg-transparent border-none outline-none focus:ring-0 py-1"
            />
          </form>
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1.5 text-charcoal-400 hover:text-charcoal-600 rounded-full"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 px-3 py-1.5 rounded-lg border border-charcoal-200 hover:bg-surface-secondary"
          >
            ESC
          </button>
        </div>
      </div>

      {/* Search Results / Suggestions Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          {searchTerm.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-charcoal-500 uppercase tracking-wider">
                  Matching Events ({filteredEvents.length})
                </h3>
                {filteredEvents.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleSearchSubmit(searchTerm)}
                    className="text-xs font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1"
                  >
                    View all results <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {filteredEvents.length > 0 ? (
                <div className="divide-y divide-charcoal-100">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleSelectEvent(event.id)}
                      className="py-3 px-2 flex items-center gap-4 hover:bg-surface-secondary rounded-xl cursor-pointer transition-colors"
                    >
                      <img
                        src={event.thumbnailImage}
                        alt={event.title}
                        className="w-16 h-16 sm:w-20 sm:h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                            {event.category}
                          </span>
                          <span className="text-xs text-charcoal-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.city}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-charcoal-900 truncate">
                          {event.title}
                        </h4>
                        <p className="text-xs text-charcoal-500 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          {formatDate(event.date)} • {event.venue.name}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-charcoal-400 block">From</span>
                        <span className="text-sm font-bold text-charcoal-900">
                          {formatCurrency(event.startingPrice)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-charcoal-600 mb-2">
                    No matching events found for &ldquo;{searchTerm}&rdquo;
                  </p>
                  <p className="text-xs text-charcoal-400">
                    Try checking your spelling or browse our popular categories below.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Popular Searches */}
              <div>
                <h3 className="text-xs font-bold text-charcoal-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-500" />
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((query) => (
                    <button
                      key={query}
                      type="button"
                      onClick={() => {
                        setSearchTerm(query);
                        handleSearchSubmit(query);
                      }}
                      className="text-xs font-medium text-charcoal-700 bg-surface-secondary hover:bg-charcoal-200/80 px-3 py-2 rounded-lg border border-charcoal-200 transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold text-charcoal-400 uppercase tracking-wider mb-3">
                  Browse by Category
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {SEARCH_CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl border border-charcoal-200 hover:border-brand-300 hover:bg-brand-50/40 text-left transition-all"
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-xs font-semibold text-charcoal-800">
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
