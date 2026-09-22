import React from 'react';
import { useUiStore } from '@/store/uiStore';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUiStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-brand-600 shrink-0" />,
        };

        const borders = {
          success: 'border-emerald-200 bg-white shadow-card',
          error: 'border-red-200 bg-white shadow-card',
          warning: 'border-amber-200 bg-white shadow-card',
          info: 'border-brand-200 bg-white shadow-card',
        };

        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-200 animate-fade-in',
              borders[toast.type]
            )}
          >
            {icons[toast.type]}
            <div className="flex-1 text-xs sm:text-sm text-charcoal-800 font-medium leading-relaxed">
              {toast.message}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-1 text-charcoal-400 hover:text-charcoal-600 rounded-md transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
