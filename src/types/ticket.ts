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
