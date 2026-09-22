import { create } from 'zustand';

export interface SelectedTicketMap {
  [ticketTypeId: string]: number; // ticketTypeId -> quantity
}

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  duration?: number;
}

interface UiState {
  // City & Location
  selectedCity: string;
  setSelectedCity: (city: string) => void;

  // Active Booking Flow
  bookingEventId: string | null;
  selectedTickets: SelectedTicketMap;
  reservationExpiresAt: number | null;
  setBookingEvent: (eventId: string) => void;
  updateTicketQuantity: (ticketTypeId: string, quantity: number) => void;
  clearBookingSelection: () => void;
  startReservationTimer: (durationSeconds?: number) => void;
  clearReservationTimer: () => void;

  // Active Queue Session
  activeQueueId: string | null;
  queueToken: string | null;
  activeQueueEventId: string | null;
  setActiveQueue: (queueId: string | null, token?: string, eventId?: string) => void;

  // Modals & Overlays
  isSearchOpen: boolean;
  isLocationModalOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  setLocationModalOpen: (open: boolean) => void;

  // Payment UI Guard
  isPaymentSubmitting: boolean;
  setPaymentSubmitting: (isSubmitting: boolean) => void;

  // Global Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  selectedCity: 'Chennai',
  setSelectedCity: (city) => set({ selectedCity: city }),

  bookingEventId: null,
  selectedTickets: {},
  reservationExpiresAt: null,
  setBookingEvent: (eventId) => set({ bookingEventId: eventId }),
  updateTicketQuantity: (ticketTypeId, quantity) =>
    set((state) => {
      const updated = { ...state.selectedTickets };
      if (quantity <= 0) {
        delete updated[ticketTypeId];
      } else {
        updated[ticketTypeId] = quantity;
      }
      return { selectedTickets: updated };
    }),
  clearBookingSelection: () =>
    set({ selectedTickets: {}, bookingEventId: null, reservationExpiresAt: null }),
  startReservationTimer: (durationSeconds = 600) =>
    set({ reservationExpiresAt: Date.now() + durationSeconds * 1000 }),
  clearReservationTimer: () => set({ reservationExpiresAt: null }),

  activeQueueId: null,
  queueToken: null,
  activeQueueEventId: null,
  setActiveQueue: (queueId, token, eventId) =>
    set({
      activeQueueId: queueId,
      queueToken: token || null,
      activeQueueEventId: eventId || null,
    }),

  isSearchOpen: false,
  isLocationModalOpen: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setLocationModalOpen: (open) => set({ isLocationModalOpen: open }),

  isPaymentSubmitting: false,
  setPaymentSubmitting: (isSubmitting) => set({ isPaymentSubmitting: isSubmitting }),

  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, duration);
    }
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
