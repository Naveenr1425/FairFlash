import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/common/Input';
import { User, Mail, Phone, ShieldCheck } from 'lucide-react';

const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address where tickets will be sent'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number (e.g. 9840123456)'),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms of entry and booking policy'),
  receiveUpdates: z.boolean().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export interface CheckoutFormProps {
  initialValues?: Partial<CheckoutFormData>;
  onSubmit: (data: CheckoutFormData) => void;
  formId?: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  initialValues = {
    fullName: 'Rahul Sundaram',
    email: 'rahul.sundaram@example.com',
    phone: '9840123456',
    acceptTerms: true,
    receiveUpdates: true,
  },
  onSubmit,
  formId = 'checkout-form',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: initialValues,
  });

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl border border-charcoal-200 p-5 sm:p-6 shadow-subtle space-y-4"
    >
      <div className="pb-3 border-b border-charcoal-100">
        <h3 className="text-base font-bold text-charcoal-900">
          Attendee & Contact Information
        </h3>
        <p className="text-xs text-charcoal-500 mt-0.5">
          Your digital ticket passes and SMS entry confirmation will be sent here.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <Input
          label="Primary Attendee Name"
          placeholder="e.g. Rahul Sundaram"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.fullName?.message}
          required
          {...register('fullName')}
        />

        {/* Email */}
        <Input
          label="Email Address for Tickets"
          type="email"
          placeholder="e.g. rahul@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          hint="We will email your barcode passes immediately after confirmation."
          required
          {...register('email')}
        />

        {/* Phone */}
        <Input
          label="Mobile Number (SMS Updates & Gate Verification)"
          type="tel"
          placeholder="10-digit mobile number"
          leftIcon={<Phone className="w-4 h-4" />}
          error={errors.phone?.message}
          hint="Used for entry verification and gate alerts."
          required
          {...register('phone')}
        />
      </div>

      {/* Checkboxes */}
      <div className="pt-3 border-t border-charcoal-100 space-y-3">
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-charcoal-700 select-none">
            <input
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-charcoal-300 text-brand-500 focus:ring-brand-500"
              {...register('acceptTerms')}
            />
            <span>
              I agree to the <strong>FairFlash Booking Terms</strong>, venue safety rules, and understand tickets are non-transferable at the gate.
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-xs text-red-600 mt-1 font-medium pl-6">
              {errors.acceptTerms.message}
            </p>
          )}
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-charcoal-600 select-none">
          <input
            type="checkbox"
            className="w-4 h-4 mt-0.5 rounded border-charcoal-300 text-brand-500 focus:ring-brand-500"
            {...register('receiveUpdates')}
          />
          <span>Send me WhatsApp reminders with venue directions and gate opening times.</span>
        </label>
      </div>

      <div className="pt-2 flex items-center gap-2 text-xs text-charcoal-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Your personal contact information is protected and never sold to third-party brokers.</span>
      </div>
    </form>
  );
};
