import { useQuery } from '@tanstack/react-query';
import { ticketsApi } from '@/api/ticketsApi';
import { queryKeys } from './queryKeys';

export function useTickets() {
  return useQuery({
    queryKey: queryKeys.tickets.all,
    queryFn: () => ticketsApi.getTickets(),
    staleTime: 1000 * 60 * 2,
  });
}

export function useTicket(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.tickets.detail(id || ''),
    queryFn: () => ticketsApi.getTicketById(id!),
    enabled: Boolean(id),
  });
}
