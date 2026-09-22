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
  price: number; // in INR
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
  mapCoords?: { lat: number; lng: number };
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  category: EventCategory;
  date: string; // ISO format: YYYY-MM-DD
  time: string; // "18:30"
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
