import React from 'react';
import { Order } from '@/types/order';
import { OrderCard } from './OrderCard';
import { EmptyState } from '@/components/common/EmptyState';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface OrderListProps {
  orders: Order[];
  isLoading?: boolean;
  className?: string;
}

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  isLoading = false,
  className,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-charcoal-200 p-6 space-y-4 animate-pulse">
            <div className="h-4 bg-charcoal-200 rounded w-1/4" />
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-charcoal-200 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-charcoal-200 rounded w-3/4" />
                <div className="h-3 bg-charcoal-100 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No booking orders found"
        description="You haven't purchased any tickets yet. Explore upcoming concerts, sports events, and cinema premieres."
        icon={<ShoppingBag className="w-7 h-7" />}
        actionLabel="Explore Events"
        onAction={() => navigate('/')}
      />
    );
  }

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6', className)}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
