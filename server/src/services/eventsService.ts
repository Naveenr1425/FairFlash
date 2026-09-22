import { seedEvents } from '../data/seedEvents.js';
import { Event } from '../types/index.js';

export interface GetEventsFilters {
  city?: string;
  category?: string;
  search?: string;
  isHighDemand?: boolean;
  isFlashSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

class EventsService {
  private events: Event[] = [...seedEvents];

  public getAllEvents(filters: GetEventsFilters = {}): { events: Event[]; total: number } {
    let results = [...this.events];

    if (filters.city && filters.city !== 'All Cities' && filters.city !== 'All') {
      results = results.filter(e => e.city.toLowerCase() === filters.city?.toLowerCase());
    }

    if (filters.category && filters.category !== 'All') {
      results = results.filter(e => e.category.toLowerCase() === filters.category?.toLowerCase());
    }

    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      results = results.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.venue.name.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.tags.some(t => t.toLowerCase().includes(q)) ||
        e.description.toLowerCase().includes(q)
      );
    }

    if (filters.isHighDemand !== undefined) {
      results = results.filter(e => e.isHighDemand === filters.isHighDemand);
    }

    if (filters.isFlashSale !== undefined) {
      results = results.filter(e => e.isFlashSale === filters.isFlashSale);
    }

    if (filters.minPrice !== undefined) {
      results = results.filter(e => e.startingPrice >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter(e => e.startingPrice <= filters.maxPrice!);
    }

    return {
      events: results,
      total: results.length,
    };
  }

  public getEventById(idOrSlug: string): Event | null {
    const event = this.events.find(e => e.id === idOrSlug || e.slug === idOrSlug);
    return event || null;
  }

  public getFeaturedBannerEvents(): Event[] {
    return this.events.filter(e => e.isHighDemand || e.isFlashSale).slice(0, 4);
  }
}

export const eventsService = new EventsService();
