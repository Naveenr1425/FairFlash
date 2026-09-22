import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '@/api/eventsApi';
import { queryKeys } from './queryKeys';

export function useEvent(idOrSlug: string | undefined) {
  return useQuery({
    queryKey: queryKeys.events.detail(idOrSlug || ''),
    queryFn: () => eventsApi.getEventById(idOrSlug!),
    enabled: Boolean(idOrSlug),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
