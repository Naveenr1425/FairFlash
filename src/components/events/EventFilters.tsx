import React from 'react';
import { EventCategory } from '@/types/event';
import { Filter, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface FilterState {
  city?: string;
  category?: string;
  isHighDemand?: boolean;
  isFlashSale?: boolean;
  maxPrice?: number;
}

export interface EventFiltersProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
  className?: string;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Categories', value: 'All' },
  { label: 'Concerts', value: 'Concerts' },
  { label: 'Live Sports', value: 'Sports' },
  { label: 'Movies & IMAX', value: 'Movies' },
  { label: 'Stand-up Comedy', value: 'Comedy' },
  { label: 'Theatre & Plays', value: 'Theatre' },
];

const CITIES: { label: string; value: string }[] = [
  { label: 'All Metros', value: 'All' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Bengaluru', value: 'Bengaluru' },
  { label: 'Delhi NCR', value: 'Delhi NCR' },
];

const PRICE_TIERS = [
  { label: 'Any Price', max: undefined },
  { label: 'Under ₹500', max: 500 },
  { label: 'Under ₹1,500', max: 1500 },
  { label: 'Under ₹3,000', max: 3000 },
  { label: 'Under ₹5,000', max: 5000 },
];

export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
  className,
}) => {
  const hasActiveFilters = Boolean(
    (filters.category && filters.category !== 'All') ||
    (filters.city && filters.city !== 'All') ||
    filters.isHighDemand ||
    filters.isFlashSale ||
    filters.maxPrice !== undefined
  );

  return (
    <div className={cn('bg-white rounded-2xl border border-charcoal-200 p-5 shadow-subtle', className)}>
      <div className="flex items-center justify-between pb-4 border-b border-charcoal-100 mb-5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-500" />
          <h3 className="text-sm font-bold text-charcoal-900">Filter Events</h3>
          <span className="text-xs text-charcoal-500">({totalResults})</span>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Reset all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2.5">
            Category
          </h4>
          <div className="space-y-1.5">
            {CATEGORIES.map((cat) => {
              const isSelected =
                (filters.category || 'All').toLowerCase() === cat.value.toLowerCase();
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      category: cat.value === 'All' ? undefined : (cat.value as EventCategory),
                    })
                  }
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left',
                    isSelected
                      ? 'bg-brand-50 text-brand-600 font-semibold'
                      : 'text-charcoal-700 hover:bg-surface-secondary'
                  )}
                >
                  <span>{cat.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* City Filter */}
        <div>
          <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2.5">
            Location
          </h4>
          <div className="space-y-1.5">
            {CITIES.map((city) => {
              const isSelected =
                (filters.city || 'All').toLowerCase() === city.value.toLowerCase();
              return (
                <button
                  key={city.value}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      city: city.value === 'All' ? undefined : city.value,
                    })
                  }
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left',
                    isSelected
                      ? 'bg-brand-50 text-brand-600 font-semibold'
                      : 'text-charcoal-700 hover:bg-surface-secondary'
                  )}
                >
                  <span>{city.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2.5">
            Price Range
          </h4>
          <div className="space-y-1.5">
            {PRICE_TIERS.map((tier) => {
              const isSelected = filters.maxPrice === tier.max;
              return (
                <button
                  key={tier.label}
                  type="button"
                  onClick={() => onChange({ ...filters, maxPrice: tier.max })}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left',
                    isSelected
                      ? 'bg-brand-50 text-brand-600 font-semibold'
                      : 'text-charcoal-700 hover:bg-surface-secondary'
                  )}
                >
                  <span>{tier.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Demand Flags */}
        <div>
          <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2.5">
            Special Access
          </h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2.5 text-xs text-charcoal-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={Boolean(filters.isFlashSale)}
                onChange={(e) =>
                  onChange({ ...filters, isFlashSale: e.target.checked ? true : undefined })
                }
                className="w-4 h-4 rounded border-charcoal-300 text-brand-500 focus:ring-brand-500"
              />
              <span className="font-medium">Flash Sales Only ⚡</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-charcoal-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={Boolean(filters.isHighDemand)}
                onChange={(e) =>
                  onChange({ ...filters, isHighDemand: e.target.checked ? true : undefined })
                }
                className="w-4 h-4 rounded border-charcoal-300 text-brand-500 focus:ring-brand-500"
              />
              <span className="font-medium">High Demand Events 🔥</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
