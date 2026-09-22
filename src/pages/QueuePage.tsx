import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvent } from '@/hooks/useEvent';
import {
  useJoinQueue,
  useQueuePosition,
  useLeaveQueue,
  useSetQueueStatusForTesting,
} from '@/hooks/useQueue';
import { useUiStore } from '@/store/uiStore';
import { QueueCard } from '@/components/queue/QueueCard';
import { BookingSteps } from '@/components/booking/BookingSteps';
import { Skeleton } from '@/components/common/Skeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { formatDate } from '@/utils/formatDate';
import { QueueSession, QueueStatus } from '@/types/queue';

export const QueuePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    activeQueueId,
    setActiveQueue,
    startReservationTimer,
  } = useUiStore();

  const { data: event, isLoading: isEventLoading, isError: isEventError } = useEvent(id);
  const joinQueueMutation = useJoinQueue();
  const leaveQueueMutation = useLeaveQueue();
  const setQueueStatusMutation = useSetQueueStatusForTesting();

  // Initialize queue on mount if not already in one for this event
  useEffect(() => {
    if (event && !activeQueueId) {
      joinQueueMutation.mutate(event.id, {
        onSuccess: (session: QueueSession) => {
          setActiveQueue(session.queueId, session.token, event.id);
          if (session.status === 'ready') {
            startReservationTimer(600); // 10 minutes
          }
        },
      });
    }
  }, [event, activeQueueId]);

  // Polling hook
  const {
    data: queueData,
    isLoading: isQueueLoading,
    refetch: refetchQueue,
  } = useQueuePosition(activeQueueId, Boolean(activeQueueId));

  const session: QueueSession = queueData || {
    queueId: activeQueueId || 'temp-id',
    eventId: id || 'evt-001',
    position: 8,
    initialPosition: 12,
    estimatedWaitSeconds: 24,
    status: 'waiting',
    joinedAt: Date.now(),
  };

  const handleContinueToBooking = () => {
    startReservationTimer(600);
    navigate(`/events/${id}/booking`);
  };

  const handleLeaveQueue = () => {
    if (activeQueueId) {
      leaveQueueMutation.mutate(activeQueueId);
    }
    setActiveQueue(null);
    navigate(`/events/${id}`);
  };

  const handleSetStatus = (status: QueueStatus) => {
    if (activeQueueId) {
      setQueueStatusMutation.mutate({ queueId: activeQueueId, status });
    }
  };

  if (isEventLoading || isQueueLoading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 space-y-6">
        <Skeleton height={140} rounded="lg" />
        <Skeleton height={260} rounded="lg" />
      </div>
    );
  }

  if (isEventError || !event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <ErrorState
          title="Unable to load queue room"
          message="Could not connect to the FairFlash waiting room. Please return to the event page."
          onRetry={() => navigate(`/events/${id}`)}
          actionLabel="Back to Event"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary py-6 sm:py-10">
      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Progress Steps Header */}
        <BookingSteps currentStep="queue" hasQueue={true} className="mb-6" />

        {/* The Central Accessible Queue Card */}
        <QueueCard
          session={session}
          eventTitle={event.title}
          venueName={event.venue.name}
          eventDate={formatDate(event.date)}
          bannerImage={event.bannerImage}
          onLeaveQueue={handleLeaveQueue}
          onContinueToBooking={handleContinueToBooking}
          onRefresh={() => refetchQueue()}
          onTestSetStatus={handleSetStatus}
        />
      </main>
    </div>
  );
};

export default QueuePage;
