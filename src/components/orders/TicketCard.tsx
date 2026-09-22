import React from 'react';
import { Ticket } from '@/types/ticket';
import { formatDate } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import { useUiStore } from '@/store/uiStore';
import { MapPin, Calendar, User, Download, Share2, QrCode } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface TicketCardProps {
  ticket: Ticket;
  className?: string;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, className }) => {
  const { addToast } = useUiStore();

  const handleDownload = () => {
    addToast({
      type: 'success',
      message: `Downloaded digital ticket pass for ${ticket.ticketTypeName} (#${ticket.id})`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: ticket.eventTitle,
          text: `My ticket for ${ticket.eventTitle} on ${formatDate(ticket.eventDate)}!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      addToast({
        type: 'info',
        message: 'Ticket link copied to clipboard!',
      });
    }
  };

  return (
    <div
      className={cn(
        'relative bg-white rounded-3xl border border-charcoal-200/90 shadow-card overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-floating',
        className
      )}
    >
      {/* Left / Main Pass Section */}
      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full">
                {ticket.ticketTypeName}
              </span>
              <span className="text-xs font-mono font-bold text-charcoal-500">
                {ticket.id}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Valid for Entry
            </span>
          </div>

          {/* Event Title */}
          <h3 className="text-lg sm:text-xl font-extrabold text-charcoal-900 tracking-tight leading-snug">
            {ticket.eventTitle}
          </h3>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-charcoal-100 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">
                Date & Time
              </span>
              <p className="font-bold text-charcoal-800 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span>{formatDate(ticket.eventDate)} • {ticket.eventTime}</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">
                Seat / Allocation
              </span>
              <p className="font-bold text-charcoal-800 mt-0.5 font-mono">
                {ticket.seatOrSection}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">
                Venue Location
              </span>
              <p className="font-semibold text-charcoal-700 flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span className="truncate">{ticket.venueName}</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">
                Ticket Holder
              </span>
              <p className="font-semibold text-charcoal-700 flex items-center gap-1 mt-0.5 truncate">
                <User className="w-3.5 h-3.5 text-charcoal-400 shrink-0" />
                <span className="truncate">{ticket.attendeeName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-charcoal-100">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-surface-secondary text-charcoal-800 hover:bg-charcoal-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Pass</span>
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 hover:bg-surface-secondary transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <span className="text-xs font-bold text-charcoal-900 ml-auto">
            {formatCurrency(ticket.price)}
          </span>
        </div>
      </div>

      {/* Perforated Divider (Desktop vertical / Mobile horizontal) */}
      <div className="relative flex md:flex-col items-center justify-between border-t md:border-t-0 md:border-l border-dashed border-charcoal-300 bg-surface-secondary/40">
        {/* Notch top / left */}
        <div className="w-6 h-6 rounded-full bg-surface-primary -mt-3 md:-mt-0 md:-ml-3 border border-charcoal-200/80" />
        {/* Notch bottom / right */}
        <div className="w-6 h-6 rounded-full bg-surface-primary -mb-3 md:-mb-0 md:-mr-3 border border-charcoal-200/80" />
      </div>

      {/* Right / QR Code Stub */}
      <div className="p-6 bg-surface-secondary/60 flex flex-col items-center justify-center text-center min-w-[200px] shrink-0 border-t md:border-t-0 md:border-l border-charcoal-200">
        {/* QR Code Graphic Placeholder */}
        <div className="w-32 h-32 bg-white rounded-2xl p-2.5 border border-charcoal-200 shadow-subtle flex flex-col items-center justify-center relative group">
          <QrCode className="w-24 h-24 text-charcoal-900" />
          <div className="absolute inset-0 bg-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-bold bg-white text-charcoal-900 px-2 py-0.5 rounded shadow">
              Scan at gate
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 mt-2.5 block">
          Gate Turnstile QR
        </span>
        <span className="text-[11px] font-mono text-charcoal-500 mt-0.5 font-semibold">
          {ticket.id}
        </span>
      </div>
    </div>
  );
};
