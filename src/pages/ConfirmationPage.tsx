import React, { useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useOrder } from '@/hooks/useOrders';
import { useTickets } from '@/hooks/useTickets';
import { TicketCard } from '@/components/orders/TicketCard';
import { Button } from '@/components/common/Button';
import { Skeleton } from '@/components/common/Skeleton';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Ticket as TicketIcon,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';

export const ConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId') || 'FF2026093841';

  const { data: order, isLoading: isOrderLoading } = useOrder(orderId);
  const { data: allTickets = [] } = useTickets();

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF5A5F', '#10B981', '#F59E0B', '#3B82F6'],
      });
    } catch {
      // ignore
    }
  }, []);

  const orderTickets = allTickets.filter((t) => t.orderId === orderId);

  if (isOrderLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <Skeleton height={120} rounded="lg" />
        <Skeleton height={260} rounded="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary py-8 sm:py-12">
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Celebratory Hero Header */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-10 shadow-card text-center mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-subtle animate-bounce">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Payment Verified & Confirmed
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-charcoal-900 tracking-tight mt-3">
            You&apos;re Going to the Show!
          </h1>

          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto mt-2 leading-relaxed">
            Booking ID: <strong className="font-mono text-charcoal-900">{orderId}</strong>. We&apos;ve sent the confirmation receipt and barcode passes to{' '}
            <strong className="text-charcoal-900">{order?.customer.email || 'your registered email'}</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-6 border-t border-charcoal-100">
            <Button
              variant="primary"
              size="md"
              leftIcon={<TicketIcon className="w-4 h-4" />}
              onClick={() => navigate('/tickets')}
            >
              View in My Tickets
            </Button>
            <Button
              variant="outline"
              size="md"
              leftIcon={<ShoppingBag className="w-4 h-4" />}
              onClick={() => navigate('/orders')}
            >
              View Order Invoice
            </Button>
            <Link
              to="/"
              className="text-xs font-semibold text-charcoal-600 hover:text-brand-500 py-2 px-3"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Digital Passes Section */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-charcoal-900 flex items-center gap-2">
              <TicketIcon className="w-5 h-5 text-brand-500" />
              <span>Your Digital Admission Passes ({orderTickets.length || 1})</span>
            </h2>
            <span className="text-xs text-charcoal-500">
              Scan barcode at gate turnstile
            </span>
          </div>

          {orderTickets.length > 0 ? (
            orderTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          ) : order ? (
            // Fallback generated pass if tickets array was empty
            <TicketCard
              ticket={{
                id: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
                orderId: order.id,
                eventId: order.eventId,
                eventTitle: order.eventTitle,
                eventDate: order.eventDate,
                eventTime: order.eventTime,
                venueName: order.venueName,
                venueAddress: `${order.venueName}, ${order.venueCity}`,
                ticketTypeName: order.items[0]?.ticketTypeName || 'General Admission',
                seatOrSection: 'Sec A - Row 1, Seat 12',
                attendeeName: order.customer.fullName,
                qrCodeData: `FAIRFLASH:${order.id}`,
                status: 'valid',
                price: order.grandTotal,
              }}
            />
          ) : null}
        </div>

        {/* Summary Details Card */}
        {order && (
          <div className="bg-white rounded-2xl border border-charcoal-200 p-6 shadow-subtle mb-8">
            <h3 className="text-sm font-bold text-charcoal-900 pb-3 border-b border-charcoal-100 mb-4">
              Booking Receipt Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-charcoal-400 block">Event Title</span>
                <span className="font-bold text-charcoal-900 text-sm mt-0.5 block">{order.eventTitle}</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Date & Venue</span>
                <span className="font-semibold text-charcoal-800 mt-0.5 block">
                  {formatDate(order.eventDate)} • {order.eventTime} at {order.venueName}
                </span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Payment Method</span>
                <span className="font-semibold text-charcoal-800 mt-0.5 block">{order.paymentMethod}</span>
              </div>
              <div>
                <span className="text-charcoal-400 block">Total Paid</span>
                <span className="font-bold text-charcoal-900 text-sm mt-0.5 block">
                  {formatCurrency(order.grandTotal)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Gate Entry & Safety Tips */}
        <div className="bg-brand-50/60 rounded-2xl border border-brand-200/80 p-5 sm:p-6 text-xs text-charcoal-700 space-y-2">
          <h4 className="font-bold text-charcoal-900 flex items-center gap-1.5 text-sm">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Gate Entry Instructions</span>
          </h4>
          <ul className="list-disc list-inside space-y-1 text-charcoal-600 pl-1">
            <li>Please have your QR pass ready with screen brightness on maximum at the turnstile.</li>
            <li>Government-issued photo ID may be requested for age verification at venue gates.</li>
            <li>Gates open approximately 90 minutes prior to scheduled start time.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage;
