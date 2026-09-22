import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '@/types/order';
import { formatDate } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import { Calendar, MapPin, Ticket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface OrderCardProps {
  order: Order;
  className?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, className }) => {
  const totalTickets = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-charcoal-200/90 p-5 sm:p-6 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between gap-4',
        className
      )}
    >
      <div>
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-charcoal-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-charcoal-500">
              #{order.id}
            </span>
            <span className="text-charcoal-300">•</span>
            <span className="text-xs text-charcoal-400">
              Booked on {formatDate(order.createdAt)}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirmed</span>
          </span>
        </div>

        {/* Event Info */}
        <div className="flex gap-4 pt-4">
          <img
            src={order.bannerImage}
            alt={order.eventTitle}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm sm:text-base font-bold text-charcoal-900 line-clamp-1">
              {order.eventTitle}
            </h4>
            <p className="text-xs text-brand-600 font-semibold flex items-center gap-1 mt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(order.eventDate)} • {order.eventTime}</span>
            </p>
            <p className="text-xs text-charcoal-500 flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-charcoal-400" />
              <span>{order.venueName}, {order.venueCity}</span>
            </p>
          </div>
        </div>

        {/* Items Summary */}
        <div className="mt-4 pt-3 border-t border-charcoal-100 text-xs text-charcoal-600 space-y-1">
          {order.items.map((item) => (
            <div key={item.ticketTypeId} className="flex justify-between">
              <span>
                {item.quantity}× {item.ticketTypeName}
              </span>
              <span className="font-semibold text-charcoal-800">
                {formatCurrency(item.totalPrice)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer: Grand Total & Actions */}
      <div className="mt-2 pt-3 border-t border-charcoal-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-charcoal-400 block font-bold uppercase tracking-wider">
            Total Paid ({totalTickets} {totalTickets === 1 ? 'ticket' : 'tickets'})
          </span>
          <span className="text-base sm:text-lg font-black text-charcoal-900">
            {formatCurrency(order.grandTotal)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/tickets`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-50 text-brand-600 hover:bg-brand-500 hover:text-white transition-all shadow-2xs"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>View Tickets</span>
          </Link>
          <Link
            to={`/orders/${order.id}`}
            className="p-1.5 text-charcoal-400 hover:text-charcoal-800 transition-colors"
            aria-label="View order invoice details"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
