export type EventCategory = 'Concerts' | 'Sports' | 'Movies' | 'Comedy' | 'Theatre';

export type AvailabilityStatus = 
  | 'available' 
  | 'few_tickets_left' 
  | 'selling_fast' 
  | 'almost_sold_out' 
  | 'sold_out';

export interface TicketType {
  id: string;
  name: string;
  price: number;
  bookingFee: number;
  description: string;
  perks: string[];
  availability: AvailabilityStatus;
  maxPerOrder: number;
}

export interface EventVenue {
  name: string;
  address: string;
  city: string;
  landmark?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  date: string;
  time: string;
  doorsOpen?: string;
  duration?: string;
  ageRestriction?: string;
  language?: string;
  venue: EventVenue;
  city: string;
  description: string;
  highlights: string[];
  bannerImage: string;
  thumbnailImage: string;
  startingPrice: number;
  ticketTypes: TicketType[];
  isHighDemand: boolean;
  isFlashSale: boolean;
  saleStartsAt?: string;
  status: 'upcoming' | 'live' | 'ended';
  tags: string[];
}

export type QueueStatus = 
  | 'waiting' 
  | 'ready' 
  | 'paused' 
  | 'expired' 
  | 'sold_out' 
  | 'error';

export interface QueueSession {
  queueId: string;
  eventId: string;
  position: number;
  initialPosition: number;
  estimatedWaitSeconds: number;
  status: QueueStatus;
  joinedAt: number;
  expiresAt?: number;
  token?: string;
  errorMessage?: string;
}

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

export interface Ticket {
  id: string; // TKT-XXXXXX
  orderId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  ticketTypeName: string;
  seatOrSection: string;
  attendeeName: string;
  qrCodeData: string;
  status: 'valid' | 'used' | 'cancelled';
  price: number;
}
