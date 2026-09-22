import React from 'react';
import { TicketType } from '@/types/event';
import { Badge, BadgeVariant } from '@/components/common/Badge';
import { QuantitySelector } from './QuantitySelector';
import { formatCurrency } from '@/utils/formatCurrency';
import { Check, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface TicketTypeCardProps {
  ticketType: TicketType;
  selectedQuantity: number;
  onChangeQuantity: (qty: number) => void;
  disabled?: boolean;
  className?: string;
}

export const TicketTypeCard: React.FC<TicketTypeCardProps> = ({
  ticketType,
  selectedQuantity,
  onChangeQuantity,
  disabled = false,
  className,
}) => {
  const isSoldOut = ticketType.availability === 'sold_out';

  let badgeVariant: BadgeVariant = 'default';
  let badgeLabel = '';

  if (isSoldOut) {
    badgeVariant = 'danger';
    badgeLabel = 'Sold Out';
  } else if (ticketType.availability === 'few_tickets_left') {
    badgeVariant = 'warning';
    badgeLabel = 'Few Tickets Left';
  } else if (ticketType.availability === 'selling_fast') {
    badgeVariant = 'brand';
    badgeLabel = 'Selling Fast';
  } else if (ticketType.availability === 'almost_sold_out') {
    badgeVariant = 'danger';
    badgeLabel = 'Almost Sold Out';
  }

  return (
    <div
      className={cn(
        'p-4 sm:p-5 rounded-xl border transition-all duration-200 bg-white flex flex-col justify-between gap-4',
        selectedQuantity > 0
          ? 'border-brand-500 ring-2 ring-brand-500/10 shadow-sm'
          : 'border-charcoal-200 hover:border-charcoal-300',
        isSoldOut && 'opacity-60 bg-surface-secondary/50',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        {/* Left Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="text-sm sm:text-base font-bold text-charcoal-900">
              {ticketType.name}
            </h4>
            {badgeLabel && (
              <Badge variant={badgeVariant} size="sm">
                {badgeLabel}
              </Badge>
            )}
          </div>

          <p className="text-xs text-charcoal-600 mb-3 leading-relaxed">
            {ticketType.description}
          </p>

          {/* Perks list */}
          {ticketType.perks && ticketType.perks.length > 0 && (
            <ul className="space-y-1">
              {ticketType.perks.map((perk, i) => (
                <li key={i} className="flex items-center gap-1.5 text-xs text-charcoal-500">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Price & Quantity Picker */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-charcoal-100 gap-3">
          <div className="sm:text-right">
            <span className="text-base sm:text-lg font-extrabold text-charcoal-900 block">
              {formatCurrency(ticketType.price)}
            </span>
            <span className="text-[10px] text-charcoal-400 block">
              + ₹{ticketType.bookingFee} fee / ticket
            </span>
          </div>

          {isSoldOut ? (
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">
              Unavailable
            </span>
          ) : (
            <QuantitySelector
              value={selectedQuantity}
              min={0}
              max={ticketType.maxPerOrder || 6}
              onChange={onChangeQuantity}
              disabled={disabled}
              ariaLabel={`Quantity for ${ticketType.name}`}
            />
          )}
        </div>
      </div>

      {ticketType.maxPerOrder && !isSoldOut && (
        <div className="text-[11px] text-charcoal-400 flex items-center gap-1 pt-2 border-t border-charcoal-100">
          <Info className="w-3 h-3 text-charcoal-400" />
          <span>Max {ticketType.maxPerOrder} tickets allowed per booking</span>
        </div>
      )}
    </div>
  );
};
