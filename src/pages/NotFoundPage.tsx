import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Ticket, Search, Home } from 'lucide-react';
import { useUiStore } from '@/store/uiStore';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSearchOpen } = useUiStore();

  return (
    <div className="min-h-[80vh] bg-surface-primary flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 text-brand-500 border border-brand-200 flex items-center justify-center mx-auto mb-6 shadow-subtle">
          <Ticket className="w-10 h-10 -rotate-12" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          404 Page Not Found
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900 tracking-tight mt-3">
          This Show Has Left the Stage
        </h1>

        <p className="text-xs sm:text-sm text-charcoal-500 mt-2 leading-relaxed max-w-sm mx-auto">
          The event or page you&apos;re looking for couldn&apos;t be found. It may have moved or concluded.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            size="md"
            leftIcon={<Search className="w-4 h-4" />}
            onClick={() => setSearchOpen(true)}
            className="w-full sm:w-auto"
          >
            Search Events
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
