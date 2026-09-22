import { useQuery } from '@tanstack/react-query';
import { eventsApi, GetEventsParams } from '@/api/eventsApi';
import { queryKeys } from './queryKeys';

export function useEvents(params: GetEventsParams = {}) {
  return useQuery({
    queryKey: queryKeys.events.list(params),
    queryFn: () => eventsApi.getEvents(params),
    staleTime: 1000 * 60 * 3, // 3 minutes cache
  });
}

export function useFeaturedBannerEvents() {
  return useQuery({
    queryKey: queryKeys.events.featured(),
    queryFn: () => eventsApi.getFeaturedBannerEvents(),
    staleTime: 1000 * 60 * 5,
  });
}
