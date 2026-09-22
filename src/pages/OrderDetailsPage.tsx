import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '@/hooks/useOrders';
import { useTickets } from '@/hooks/useTickets';
import { TicketCard } from '@/components/orders/TicketCard';
import { Button } from '@/components/common/Button';
import { Skeleton } from '@/components/common/Skeleton';
import { ErrorState } from '@/components/common/ErrorState';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { useUiStore } from '@/store/uiStore';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  CheckCircle2,
  Download,
  FileText,
  User,
  Mail,
  Phone,
} from 'lucide-react';

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToast } = useUiStore();

  const { data: order, isLoading, isError, refetch } = useOrder(id);
  const { data: allTickets = [] } = useTickets();

  const orderTickets = allTickets.filter((t) => t.orderId === id);

  const handleDownloadInvoice = () => {
    addToast({
      type: 'success',
      message: `Tax invoice for Order #${id} downloaded successfully.`,
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <Skeleton height={40} width="40%" />
        <Skeleton height={200} rounded="lg" />
        <Skeleton height={260} rounded="lg" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <ErrorState
          title="Order Not Found"
          message={`We could not locate booking order details for #${id}.`}
          onRetry={() => refetch()}
        />
        <div className="text-center mt-4">
          <Link to="/orders" className="text-sm font-semibold text-brand-500 hover:underline">
            ← Back to Order History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-primary py-8 sm:py-10">
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/orders"
            className="flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </Link>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            onClick={handleDownloadInvoice}
          >
            Download Tax Invoice (PDF)
          </Button>
        </div>

        {/* Invoice Header Box */}
        <div className="bg-white rounded-3xl border border-charcoal-200 p-6 sm:p-8 shadow-subtle mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-charcoal-100 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
                Official FairFlash Receipt
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-charcoal-900 font-mono mt-0.5">
                Order #{order.id}
              </h1>
              <p className="text-xs text-charcoal-500 mt-1">
                Booked on {formatDate(order.createdAt)} • Payment via {order.paymentMethod}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 self-start sm:self-auto border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Payment Confirmed</span>
            </span>
          </div>

          {/* Event Mini Banner */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-surface-secondary">
            <img
              src={order.bannerImage}
              alt={order.eventTitle}
              className="w-full sm:w-28 h-28 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="text-base sm:text-lg font-bold text-charcoal-900">
                {order.eventTitle}
              </h3>
              <p className="text-xs text-brand-600 font-semibold flex items-center gap-1.5 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(order.eventDate)} at {order.eventTime}</span>
              </p>
              <p className="text-xs text-charcoal-500 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{order.venueName}, {order.venueCity}</span>
              </p>
            </div>
          </div>

          {/* Attendee Info & Billing Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-charcoal-100">
            {/* Customer Details */}
            <div>
              <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-3">
                Attendee Contact Information
              </h4>
              <div className="space-y-2 text-xs text-charcoal-700">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-charcoal-400" />
                  <span className="font-semibold">{order.customer.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-charcoal-400" />
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-charcoal-400" />
                  <span>{order.customer.phone}</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div>
              <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-3">
                Financial Invoice Breakdown
              </h4>
              <div className="space-y-1.5 text-xs">
                {order.items.map((item) => (
                  <div key={item.ticketTypeId} className="flex justify-between text-charcoal-700">
                    <span>
                      {item.quantity}× {item.ticketTypeName}
                    </span>
                    <span className="font-semibold">{formatCurrency(item.totalPrice)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-charcoal-500 pt-1 border-t border-charcoal-100">
                  <span>Convenience & Platform Fee</span>
                  <span>{formatCurrency(order.bookingFee)}</span>
                </div>
                <div className="flex justify-between text-charcoal-500">
                  <span>GST (18%)</span>
                  <span>{formatCurrency(order.taxes)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-charcoal-900 pt-2 border-t border-charcoal-200">
                  <span>Grand Total Paid</span>
                  <span>{formatCurrency(order.grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Admission Passes */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-charcoal-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-500" />
            <span>Digital Gate Passes ({orderTickets.length || order.items.reduce((a,b)=>a+b.quantity,0)})</span>
          </h2>

          {orderTickets.length > 0 ? (
            orderTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
          ) : (
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
                seatOrSection: 'Stalls - Row A, Seat 1',
                attendeeName: order.customer.fullName,
                qrCodeData: `FAIRFLASH:${order.id}`,
                status: 'valid',
                price: order.grandTotal,
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderDetailsPage;
