import React from 'react';
import { Event, TicketType } from '@/types/event';
import { SelectedTicketMap } from '@/store/uiStore';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { Button } from '@/components/common/Button';
import { ShieldCheck, Calendar, MapPin, Ticket } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface OrderSummaryProps {
  event: Event;
  selectedTickets: SelectedTicketMap;
  onProceed?: () => void;
  proceedLabel?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  showProceedButton?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  event,
  selectedTickets,
  onProceed,
  proceedLabel = 'Proceed to Checkout',
  isLoading = false,
  disabled = false,
  className,
  showProceedButton = true,
}) => {
  // Calculate subtotals
  let subtotal = 0;
  let totalTicketCount = 0;
  let totalBookingFees = 0;

  const ticketBreakdown = Object.entries(selectedTickets)
    .filter(([_, qty]) => qty > 0)
    .map(([typeId, quantity]) => {
      const type = event.ticketTypes.find((t: TicketType) => t.id === typeId);
      const price = type?.price || 0;
      const fee = type?.bookingFee || 0;
      const total = price * quantity;
      subtotal += total;
      totalTicketCount += quantity;
      totalBookingFees += fee * quantity;
      return {
        type,
        quantity,
        total,
      };
    });

  const estimatedTax = Math.round((subtotal + totalBookingFees) * 0.18);
  const grandTotal = subtotal + totalBookingFees + estimatedTax;

  return (
    <div className={cn('bg-white rounded-2xl border border-charcoal-200 p-5 sm:p-6 shadow-card', className)}>
      <h3 className="text-base font-bold text-charcoal-900 pb-3 border-b border-charcoal-100 flex items-center justify-between">
        <span>Order Summary</span>
        <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
          {totalTicketCount} {totalTicketCount === 1 ? 'ticket' : 'tickets'}
        </span>
      </h3>

      {/* Event Details Mini Block */}
      <div className="py-4 border-b border-charcoal-100 flex gap-3">
        <img
          src={event.thumbnailImage}
          alt={event.title}
          className="w-14 h-14 rounded-lg object-cover shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm font-bold text-charcoal-900 truncate">
            {event.title}
          </h4>
          <p className="text-[11px] text-charcoal-500 flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3 text-charcoal-400" />
            {formatDate(event.date)} • {event.time}
          </p>
          <p className="text-[11px] text-charcoal-500 flex items-center gap-1 mt-0.5 truncate">
            <MapPin className="w-3 h-3 text-charcoal-400" />
            {event.venue.name}, {event.city}
          </p>
        </div>
      </div>

      {/* Selected Tickets Breakdown */}
      <div className="py-3 border-b border-charcoal-100 space-y-2">
        {ticketBreakdown.length > 0 ? (
          ticketBreakdown.map(({ type, quantity, total }) => (
            <div key={type?.id} className="flex items-center justify-between text-xs">
              <div className="text-charcoal-700">
                <span className="font-semibold">{type?.name}</span>{' '}
                <span className="text-charcoal-400">× {quantity}</span>
              </div>
              <span className="font-bold text-charcoal-900">{formatCurrency(total)}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-xs text-charcoal-400 flex flex-col items-center gap-1">
            <Ticket className="w-4 h-4 text-charcoal-300" />
            <span>Select at least 1 ticket to proceed</span>
          </div>
        )}
      </div>

      {/* Fee & Tax Breakdown */}
      {totalTicketCount > 0 && (
        <div className="py-3 border-b border-charcoal-100 space-y-1.5 text-xs text-charcoal-600">
          <div className="flex justify-between">
            <span>Ticket Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-charcoal-500">
            <span>Booking & Convenience Fee</span>
            <span>{formatCurrency(totalBookingFees)}</span>
          </div>
          <div className="flex justify-between text-charcoal-500">
            <span>Integrated GST (18%)</span>
            <span>{formatCurrency(estimatedTax)}</span>
          </div>
        </div>
      )}

      {/* Grand Total */}
      <div className="pt-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase font-bold text-charcoal-400 block tracking-wider">
            Total Payable
          </span>
          <span className="text-xl sm:text-2xl font-black text-charcoal-900">
            {formatCurrency(totalTicketCount > 0 ? grandTotal : 0)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      {showProceedButton && onProceed && (
        <div className="mt-5">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            disabled={disabled || totalTicketCount === 0}
            onClick={onProceed}
          >
            {proceedLabel}
          </Button>
        </div>
      )}

      {/* Trust Notice */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-charcoal-400 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>100% Encrypted & Verified Booking</span>
      </div>
    </div>
  );
};
