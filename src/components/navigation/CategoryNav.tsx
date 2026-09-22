import React from 'react';
import { cn } from '@/utils/cn';
import { Music, Trophy, Film, Mic2, Theater, Sparkles } from 'lucide-react';

export interface CategoryNavProps {
  selectedCategory?: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

const CATEGORIES = [
  { name: 'All Events', slug: 'All', icon: <Sparkles className="w-4 h-4" /> },
  { name: 'Concerts', slug: 'Concerts', icon: <Music className="w-4 h-4" /> },
  { name: 'Sports', slug: 'Sports', icon: <Trophy className="w-4 h-4" /> },
  { name: 'Movies', slug: 'Movies', icon: <Film className="w-4 h-4" /> },
  { name: 'Comedy', slug: 'Comedy', icon: <Mic2 className="w-4 h-4" /> },
  { name: 'Theatre', slug: 'Theatre', icon: <Theater className="w-4 h-4" /> },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory = 'All',
  onSelectCategory,
  className,
}) => {
  return (
    <nav
      className={cn('w-full border-b border-charcoal-100 bg-white py-2.5', className)}
      aria-label="Event Categories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.slug.toLowerCase() ||
              (cat.slug === 'All' && (!selectedCategory || selectedCategory === 'All'));

            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 shrink-0',
                  isSelected
                    ? 'bg-brand-500 text-white shadow-sm font-semibold'
                    : 'bg-surface-secondary text-charcoal-700 hover:bg-charcoal-200/70 active:bg-charcoal-200'
                )}
              >
                <span className={isSelected ? 'text-white' : 'text-charcoal-500'}>
                  {cat.icon}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
