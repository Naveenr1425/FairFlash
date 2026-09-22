import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEvent } from '@/hooks/useEvent';
import { useCreateOrder } from '@/hooks/useOrders';
import { useUiStore } from '@/store/uiStore';
import { CheckoutForm, CheckoutFormData } from '@/components/booking/CheckoutForm';
import { PaymentSelector, PaymentMethodType } from '@/components/booking/PaymentSelector';
import { OrderSummary } from '@/components/booking/OrderSummary';
import { ReservationTimer } from '@/components/booking/ReservationTimer';
import { BookingSteps } from '@/components/booking/BookingSteps';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Skeleton } from '@/components/common/Skeleton';
import { ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    bookingEventId,
    selectedTickets,
    reservationExpiresAt,
    clearBookingSelection,
    isPaymentSubmitting,
    setPaymentSubmitting,
    addToast,
  } = useUiStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');
  const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'Rahul Sundaram',
    email: 'rahul.sundaram@example.com',
    phone: '9840123456',
    acceptTerms: true,
    receiveUpdates: true,
  });

  const { data: event, isLoading: isEventLoading } = useEvent(bookingEventId || undefined);
  const createOrderMutation = useCreateOrder();

  const totalTickets = Object.values(selectedTickets).reduce((a, b) => a + b, 0);

  // If no tickets or event selected, return to events
  useEffect(() => {
    if (!bookingEventId || totalTickets === 0) {
      navigate('/events');
    }
  }, [bookingEventId, totalTickets, navigate]);

  const handleTimerExpire = () => {
    setIsExpiredModalOpen(true);
  };

  const handleResetReservation = () => {
    clearBookingSelection();
    setIsExpiredModalOpen(false);
    navigate('/events');
  };

  const handlePay = () => {
    if (isPaymentSubmitting) {
      addToast({
        type: 'warning',
        message: 'Payment request is already being processed.',
      });
      return;
    }

    if (!formData.acceptTerms) {
      addToast({
        type: 'error',
        message: 'Please accept the booking terms before proceeding.',
      });
      return;
    }

    setPaymentSubmitting(true);

    const items = Object.entries(selectedTickets)
      .filter(([_, qty]) => qty > 0)
      .map(([ticketTypeId, quantity]) => ({
        ticketTypeId,
        quantity,
      }));

    createOrderMutation.mutate(
      {
        eventId: event!.id,
        items,
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI (Google Pay / PhonePe)'
            : paymentMethod === 'card'
            ? 'Credit / Debit Card'
            : paymentMethod === 'netbanking'
            ? 'Net Banking'
            : 'Digital Wallet',
      },
      {
        onSuccess: (data) => {
          setPaymentSubmitting(false);
          clearBookingSelection();
          navigate(`/confirmation?orderId=${data.order.id}`);
        },
        onError: () => {
          setPaymentSubmitting(false);
          addToast({
            type: 'error',
            message: 'Payment simulation error. Please retry.',
          });
        },
      }
    );
  };

  if (isEventLoading || !event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        <Skeleton height={40} width="30%" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton height={200} rounded="lg" />
            <Skeleton height={240} rounded="lg" />
          </div>
          <Skeleton height={320} rounded="lg" />
        </div>
      </div>
    );
  }

  // Calculate grand total for payment selector
  let subtotal = 0;
  let fees = 0;
  Object.entries(selectedTickets).forEach(([typeId, qty]) => {
    const type = event.ticketTypes.find((t) => t.id === typeId);
    if (type) {
      subtotal += type.price * qty;
      fees += type.bookingFee * qty;
    }
  });
  const taxes = Math.round((subtotal + fees) * 0.18);
  const grandTotal = subtotal + fees + taxes;

  return (
    <div className="min-h-screen bg-surface-primary pb-20">
      {/* Top Header & Breadcrumb */}
      <div className="border-b border-charcoal-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            to={`/events/${event.id}/booking`}
            className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modify Ticket Selection</span>
          </Link>

          {reservationExpiresAt && (
            <ReservationTimer
              expiresAt={reservationExpiresAt}
              onExpire={handleTimerExpire}
            />
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BookingSteps currentStep="checkout" hasQueue={event.isHighDemand} className="mb-6" />

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight">
            Checkout & Secure Payment
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Complete your attendee details and choose your payment method.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Form & Payment Selector */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Details Form */}
            <CheckoutForm
              initialValues={formData}
              onSubmit={(data) => setFormData(data)}
            />

            {/* Payment Method Selector */}
            <PaymentSelector
              selectedMethod={paymentMethod}
              onSelect={(m) => setPaymentMethod(m)}
              amount={grandTotal}
              isProcessing={isPaymentSubmitting || createOrderMutation.isPending}
              onPay={handlePay}
            />
          </div>

          {/* Right Col: Sticky Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                event={event}
                selectedTickets={selectedTickets}
                showProceedButton={false}
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
            Your ticket reservation timed out before payment completion. Please select your seats again.
          </p>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={handleResetReservation}
          >
            Start Over
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
