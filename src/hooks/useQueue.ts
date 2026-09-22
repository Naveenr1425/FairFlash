import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queueApi } from '@/api/queueApi';
import { queryKeys } from './queryKeys';
import { QueueSession } from '@/types/queue';

export function useQueuePosition(queueId: string | null, enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.queue.position(queueId || ''),
    queryFn: () => queueApi.getQueuePosition(queueId!),
    enabled: Boolean(queueId) && enabled,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data?.status === 'ready' || data?.status === 'sold_out' || data?.status === 'expired') {
        return false;
      }
      return 3000; // Poll every 3 seconds
    },
    refetchIntervalInBackground: true,
  });
}

export function useJoinQueue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: string) => queueApi.joinQueue(eventId),
    onSuccess: (data: QueueSession) => {
      queryClient.setQueryData(queryKeys.queue.position(data.queueId), data);
    },
  });
}

export function useLeaveQueue() {
  return useMutation({
    mutationFn: (queueId: string) => queueApi.leaveQueue(queueId),
  });
}

export function useSetQueueStatusForTesting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ queueId, status }: { queueId: string; status: QueueSession['status'] }) =>
      queueApi.setQueueStatusForTesting(queueId, status),
    onSuccess: (data: QueueSession) => {
      queryClient.setQueryData(queryKeys.queue.position(data.queueId), data);
    },
  });
}
