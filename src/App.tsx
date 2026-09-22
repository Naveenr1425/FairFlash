import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { ToastContainer } from '@/components/common/Toast';
import { Skeleton } from '@/components/common/Skeleton';

// Lazy-loaded route components for performance and code-splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const EventsPage = lazy(() => import('@/pages/EventsPage'));
const EventDetailsPage = lazy(() => import('@/pages/EventDetailsPage'));
const QueuePage = lazy(() => import('@/pages/QueuePage'));
const BookingPage = lazy(() => import('@/pages/BookingPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const ConfirmationPage = lazy(() => import('@/pages/ConfirmationPage'));
const OrdersPage = lazy(() => import('@/pages/OrdersPage'));
const OrderDetailsPage = lazy(() => import('@/pages/OrderDetailsPage'));
const TicketsPage = lazy(() => import('@/pages/TicketsPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 3, // 3 minutes
    },
  },
});

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}

// Fallback loading skeleton for Suspense
const PageSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
    <Skeleton height={280} rounded="lg" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="card" />
      ))}
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-surface-primary selection:bg-brand-100 selection:text-brand-900">
          <Header />
          <div className="flex-1">
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetailsPage />} />
                <Route path="/events/:id/queue" element={<QueuePage />} />
                <Route path="/events/:id/booking" element={<BookingPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:id" element={<OrderDetailsPage />} />
                <Route path="/tickets" element={<TicketsPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
