import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '@/hooks/useTickets';
import { TicketCard } from '@/components/orders/TicketCard';
import { Skeleton } from '@/components/common/Skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { Ticket as TicketIcon, QrCode, ShieldCheck } from 'lucide-react';

export const TicketsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: tickets = [], isLoading, isError, refetch } = useTickets();

  return (
    <div className="min-h-screen bg-surface-primary py-8 sm:py-10">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight flex items-center gap-2.5">
              <TicketIcon className="w-7 h-7 text-brand-500" />
              <span>My Ticket Wallet</span>
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Your active digital admission passes with high-contrast QR turnstile barcodes.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl px-3.5 py-2 text-xs font-semibold shrink-0">
            <QrCode className="w-4 h-4 text-emerald-600" />
            <span>Ready for Gate Scan</span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="my-6 bg-surface-secondary rounded-2xl p-4 sm:p-5 border border-charcoal-200 flex items-start gap-3 text-xs text-charcoal-600">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Gate Entry Tip:</strong> Present the digital QR code directly from your phone screen at the venue turnstiles. No physical printing needed.
          </p>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton height={200} rounded="lg" />
              <Skeleton height={200} rounded="lg" />
            </div>
          ) : isError ? (
            <ErrorState
              title="Unable to load tickets"
              message="We encountered an issue fetching your ticket wallet passes. Please retry."
              onRetry={() => refetch()}
            />
          ) : tickets.length === 0 ? (
            <EmptyState
              title="Your ticket wallet is empty"
              description="You don't have any active digital tickets. Explore popular concerts, movies, and sports matches to book your next live experience."
              icon={<TicketIcon className="w-8 h-8" />}
              actionLabel="Discover Events"
              onAction={() => navigate('/')}
            />
          ) : (
            tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default TicketsPage;
