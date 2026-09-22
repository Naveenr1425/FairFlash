export interface OrderItem {
  ticketTypeId: string;
  ticketTypeName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string; // FF202609XXXX
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueCity: string;
  bannerImage: string;
  items: OrderItem[];
  subtotal: number;
  bookingFee: number;
  taxes: number;
  grandTotal: number;
  currency: string;
  status: 'confirmed' | 'processing' | 'cancelled' | 'refunded';
  createdAt: string;
  customer: CustomerDetails;
  paymentMethod: string;
  ticketIds: string[];
}
