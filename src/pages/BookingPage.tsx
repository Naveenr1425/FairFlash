import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvent } from '@/hooks/useEvent';
import { useUiStore } from '@/store/uiStore';
import { TicketTypeCard } from '@/components/booking/TicketTypeCard';
import { OrderSummary } from '@/components/booking/OrderSummary';
import { ReservationTimer } from '@/components/booking/ReservationTimer';
import { BookingSteps } from '@/components/booking/BookingSteps';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Skeleton } from '@/components/common/Skeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    selectedTickets,
    updateTicketQuantity,
    clearBookingSelection,
    setBookingEvent,
    reservationExpiresAt,
    startReservationTimer,
  } = useUiStore();

  const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false);

  const { data: event, isLoading, isError, refetch } = useEvent(id);

  // Set booking event in store
  useEffect(() => {
    if (event) {
      setBookingEvent(event.id);
      if (!reservationExpiresAt) {
        startReservationTimer(600); // 10 minutes
      }
    }
  }, [event]);

  // Handle timer expiration
  const handleTimerExpire = () => {
    setIsExpiredModalOpen(true);
  };

  const handleResetReservation = () => {
    clearBookingSelection();
    setIsExpiredModalOpen(false);
    startReservationTimer(600);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const totalTickets = Object.values(selectedTickets).reduce((a, b) => a + b, 0);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <Skeleton height={40} width="30%" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton height={120} rounded="lg" />
            <Skeleton height={120} rounded="lg" />
          </div>
          <Skeleton height={320} rounded="lg" />
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <ErrorState
          title="Event Not Available"
          message="We could not load ticket inventory for this event. Please return to event details."
          onRetry={() => refetch()}
        />
        <div className="text-center mt-4">
          <Link to={`/events/${id}`} className="text-sm font-semibold text-brand-500 hover:underline">
            ← Back to Event
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary pb-20">
      {/* Top Header & Breadcrumb */}
      <div className="border-b border-charcoal-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            to={`/events/${event.id}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Event Overview</span>
          </Link>

          {/* Active Reservation Timer Banner */}
          {reservationExpiresAt && (
            <ReservationTimer
              expiresAt={reservationExpiresAt}
              onExpire={handleTimerExpire}
            />
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress Tracker */}
        <BookingSteps
          currentStep="tickets"
          hasQueue={event.isHighDemand}
          className="mb-6"
        />

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
            Select Your Tickets
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Choose your preferred tier for <strong>{event.title}</strong>.
          </p>
        </div>

        {/* Grid: Left Ticket Tiers, Right Sticky Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Tier Selection List */}
          <div className="lg:col-span-2 space-y-4">
            {event.ticketTypes.map((tier) => (
              <TicketTypeCard
                key={tier.id}
                ticketType={tier}
                selectedQuantity={selectedTickets[tier.id] || 0}
                onChangeQuantity={(qty) => updateTicketQuantity(tier.id, qty)}
              />
            ))}
          </div>

          {/* Right Col: Order Summary & Checkout Trigger */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                event={event}
                selectedTickets={selectedTickets}
                onProceed={handleProceedToCheckout}
                proceedLabel="Proceed to Checkout"
                disabled={totalTickets === 0}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Reservation Expired Modal */}
      <Modal
        isOpen={isExpiredModalOpen}
        onClose={handleResetReservation}
        title="Reservation Expired"
        showCloseButton={false}
      >
        <div className="text-center py-2 space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <p className="text-sm text-charcoal-600 leading-relaxed">
            Your 10-minute ticket reservation window has elapsed. To ensure fair access for everyone, tickets have been released back to the general pool.
          </p>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={handleResetReservation}
          >
            Select Tickets Again
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingPage;
