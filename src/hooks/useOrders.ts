import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi, CreateOrderPayload } from '@/api/ordersApi';
import { queryKeys } from './queryKeys';

export function useOrders() {
  return useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: () => ordersApi.getOrders(),
    staleTime: 1000 * 60 * 2,
  });
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id || ''),
    queryFn: () => ordersApi.getOrderById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => ordersApi.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.tickets.all });
    },
  });
}
