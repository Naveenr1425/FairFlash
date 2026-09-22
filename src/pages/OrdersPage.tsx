import React, { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { OrderList } from '@/components/orders/OrderList';
import { ErrorState } from '@/components/common/ErrorState';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/utils/cn';

export const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const { data: orders = [], isLoading, isError, refetch } = useOrders();

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'all') return true;
    const isPast = new Date(order.eventDate).getTime() < Date.now();
    if (activeTab === 'upcoming') return !isPast;
    if (activeTab === 'past') return isPast;
    return true;
  });

  return (
    <div className="min-h-screen bg-surface-primary py-8 sm:py-10">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight flex items-center gap-2.5">
              <ShoppingBag className="w-7 h-7 text-brand-500" />
              <span>My Booking Orders</span>
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              View your booking confirmations, invoices, and digital ticket allocations.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center bg-surface-secondary border border-charcoal-200 rounded-xl p-1 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'all'
                  ? 'bg-white text-charcoal-900 shadow-2xs font-bold'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              )}
            >
              All ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'upcoming'
                  ? 'bg-white text-charcoal-900 shadow-2xs font-bold'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              )}
            >
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('past')}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                activeTab === 'past'
                  ? 'bg-white text-charcoal-900 shadow-2xs font-bold'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              )}
            >
              Past
            </button>
          </div>
        </div>

        {/* Orders List Content */}
        <div className="mt-8">
          {isError ? (
            <ErrorState
              title="Unable to load order history"
              message="We had trouble loading your previous bookings. Please retry."
              onRetry={() => refetch()}
            />
          ) : (
            <OrderList orders={filteredOrders} isLoading={isLoading} />
          )}
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
