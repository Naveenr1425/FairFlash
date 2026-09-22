import React from 'react';
import { Button } from '@/components/common/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import { useUiStore } from '@/store/uiStore';
import { QrCode, CreditCard, Landmark, Wallet, ShieldCheck, Lock } from 'lucide-react';
import { cn } from '@/utils/cn';

export type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'wallet';

export interface PaymentSelectorProps {
  selectedMethod: PaymentMethodType;
  onSelect: (method: PaymentMethodType) => void;
  amount: number;
  isProcessing: boolean;
  onPay: () => void;
  disabled?: boolean;
}

const PAYMENT_OPTIONS = [
  {
    id: 'upi' as PaymentMethodType,
    title: 'UPI Instant Pay',
    subtitle: 'Google Pay, PhonePe, Paytm, BHIM UPI',
    icon: <QrCode className="w-5 h-5 text-brand-500" />,
    badge: 'Instant & Zero Surcharge',
  },
  {
    id: 'card' as PaymentMethodType,
    title: 'Credit / Debit Card',
    subtitle: 'Visa, Mastercard, RuPay, Diners',
    icon: <CreditCard className="w-5 h-5 text-blue-600" />,
  },
  {
    id: 'netbanking' as PaymentMethodType,
    title: 'Net Banking',
    subtitle: 'HDFC, ICICI, SBI, Axis, and 40+ banks',
    icon: <Landmark className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: 'wallet' as PaymentMethodType,
    title: 'Digital Wallets',
    subtitle: 'Amazon Pay, Mobikwik, Airtel Money',
    icon: <Wallet className="w-5 h-5 text-purple-600" />,
  },
];

export const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  selectedMethod,
  onSelect,
  amount,
  isProcessing,
  onPay,
  disabled = false,
}) => {
  const { addToast } = useUiStore();

  const handlePayClick = () => {
    if (isProcessing) {
      addToast({
        type: 'warning',
        message: 'Payment request is already being processed. Please do not close or reload the page.',
      });
      return;
    }
    onPay();
  };

  return (
    <div className="bg-white rounded-2xl border border-charcoal-200 p-5 sm:p-6 shadow-subtle">
      <div className="flex items-center justify-between pb-3 border-b border-charcoal-100 mb-4">
        <h3 className="text-base font-bold text-charcoal-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>Select Payment Method</span>
        </h3>
        <span className="text-xs text-charcoal-400 font-medium">Demo Simulator</span>
      </div>

      {/* Methods List */}
      <div className="space-y-3 mb-6">
        {PAYMENT_OPTIONS.map((option) => {
          const isSelected = selectedMethod === option.id;
          return (
            <div
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={cn(
                'flex items-start sm:items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none',
                isSelected
                  ? 'border-brand-500 bg-brand-50/40 ring-1 ring-brand-500/20 shadow-sm'
                  : 'border-charcoal-200 hover:border-charcoal-300 hover:bg-surface-secondary'
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                    isSelected ? 'bg-white shadow-subtle' : 'bg-surface-secondary'
                  )}
                >
                  {option.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-charcoal-900">
                      {option.title}
                    </span>
                    {option.badge && (
                      <span className="hidden sm:inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded-full">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-charcoal-500 truncate mt-0.5">
                    {option.subtitle}
                  </p>
                </div>
              </div>

              {/* Radio Indicator */}
              <div className="shrink-0 ml-2 mt-1 sm:mt-0">
                <div
                  className={cn(
                    'w-4 h-4 rounded-full border flex items-center justify-center transition-colors',
                    isSelected
                      ? 'border-brand-500 bg-brand-500'
                      : 'border-charcoal-300 bg-white'
                  )}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pay CTA */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isProcessing}
        disabled={disabled || isProcessing}
        onClick={handlePayClick}
        className="text-base font-bold shadow-floating py-4"
      >
        {isProcessing ? 'Processing Secure Payment...' : `Pay ${formatCurrency(amount)}`}
      </Button>

      {/* Security Footnote */}
      <div className="mt-3.5 flex items-center justify-center gap-1.5 text-[11px] text-charcoal-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>256-Bit SSL Mock Security Gateway • Zero external charge</span>
      </div>
    </div>
  );
};
