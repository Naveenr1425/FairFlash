import { mockEvents } from '@/data/mockEvents';
import { Event } from '@/types/event';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export interface GetEventsParams {
  city?: string;
  category?: string;
  search?: string;
  isHighDemand?: boolean;
  isFlashSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export const eventsApi = {
  async getEvents(params: GetEventsParams = {}): Promise<{ events: Event[]; total: number }> {
    try {
      const query = new URLSearchParams();
      if (params.city && params.city !== 'All Cities' && params.city !== 'All') query.set('city', params.city);
      if (params.category && params.category !== 'All') query.set('category', params.category);
      if (params.search) query.set('search', params.search);
      if (params.isHighDemand !== undefined) query.set('isHighDemand', String(params.isHighDemand));
      if (params.isFlashSale !== undefined) query.set('isFlashSale', String(params.isFlashSale));
      if (params.minPrice !== undefined) query.set('minPrice', String(params.minPrice));
      if (params.maxPrice !== undefined) query.set('maxPrice', String(params.maxPrice));

      const res = await fetch(`/api/events?${query.toString()}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend not running; fallback to local mock data
    }

    await delay(Math.floor(Math.random() * 300) + 300); // 300 - 600ms latency

    let results = [...mockEvents];

    if (params.city && params.city !== 'All Cities' && params.city !== 'All') {
      results = results.filter(e => e.city.toLowerCase() === params.city?.toLowerCase());
    }
    if (params.category && params.category !== 'All') {
      results = results.filter(e => e.category.toLowerCase() === params.category?.toLowerCase());
    }
    if (params.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      results = results.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.venue.name.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.tags.some(t => t.toLowerCase().includes(q)) ||
        e.description.toLowerCase().includes(q)
      );
    }
    if (params.isHighDemand !== undefined) {
      results = results.filter(e => e.isHighDemand === params.isHighDemand);
    }
    if (params.isFlashSale !== undefined) {
      results = results.filter(e => e.isFlashSale === params.isFlashSale);
    }
    if (params.minPrice !== undefined) {
      results = results.filter(e => e.startingPrice >= params.minPrice!);
    }
    if (params.maxPrice !== undefined) {
      results = results.filter(e => e.startingPrice <= params.maxPrice!);
    }

    return {
      events: results,
      total: results.length,
    };
  },

  async getEventById(idOrSlug: string): Promise<Event> {
    try {
      const res = await fetch(`/api/events/${encodeURIComponent(idOrSlug)}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback to local
    }

    await delay(Math.floor(Math.random() * 200) + 250);
    const event = mockEvents.find(e => e.id === idOrSlug || e.slug === idOrSlug);
    if (!event) {
      throw new Error(`Event not found with identifier: "${idOrSlug}"`);
    }
    return event;
  },

  async getFeaturedBannerEvents(): Promise<Event[]> {
    try {
      const res = await fetch('/api/events/featured');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    await delay(200);
    return mockEvents.filter(e => e.isHighDemand || e.isFlashSale).slice(0, 4);
  }
};
