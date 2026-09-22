import { GetEventsParams } from '@/api/eventsApi';

export const queryKeys = {
  events: {
    all: ['events'] as const,
    list: (params: GetEventsParams) => ['events', 'list', params] as const,
    featured: () => ['events', 'featured'] as const,
    detail: (id: string) => ['events', 'detail', id] as const,
  },
  queue: {
    position: (queueId: string) => ['queue', 'position', queueId] as const,
  },
  orders: {
    all: ['orders'] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
  tickets: {
    all: ['tickets'] as const,
    detail: (id: string) => ['tickets', 'detail', id] as const,
  },
};
