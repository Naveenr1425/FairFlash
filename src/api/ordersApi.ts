import { Order, OrderItem } from '@/types/order';
import { Ticket } from '@/types/ticket';
import { mockEvents } from '@/data/mockEvents';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Pre-seeded initial orders and tickets for rich initial display
const localOrders: Order[] = [
  {
    id: 'FF2026093841',
    eventId: 'evt-003',
    eventTitle: 'Zakir Khan: Live & Raw Comedy Special',
    eventDate: '2026-11-02',
    eventTime: '20:00',
    venueName: 'Sir Mutha Venkatasubba Rao Concert Hall',
    venueCity: 'Chennai',
    bannerImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=600&auto=format&fit=crop',
    items: [
      {
        ticketTypeId: 'tkt-003-plat',
        ticketTypeName: 'Auditorium Platinum',
        unitPrice: 1999,
        quantity: 2,
        totalPrice: 3998,
      }
    ],
    subtotal: 3998,
    bookingFee: 240,
    taxes: 762,
    grandTotal: 5000,
    currency: 'INR',
    status: 'confirmed',
    createdAt: '2026-09-18T14:22:00.000Z',
    customer: {
      fullName: 'Rahul Sundaram',
      email: 'rahul.sundaram@example.com',
      phone: '+91 98401 23456',
    },
    paymentMethod: 'UPI (GPay)',
    ticketIds: ['TKT-782104', 'TKT-782105'],
  }
];

const localTickets: Ticket[] = [
  {
    id: 'TKT-782104',
    orderId: 'FF2026093841',
    eventId: 'evt-003',
    eventTitle: 'Zakir Khan: Live & Raw Comedy Special',
    eventDate: '2026-11-02',
    eventTime: '20:00',
    venueName: 'Sir Mutha Venkatasubba Rao Concert Hall',
    venueAddress: 'Harrington Road, Chetpet, Chennai',
    ticketTypeName: 'Auditorium Platinum',
    seatOrSection: 'Stalls - Row D, Seat 14',
    attendeeName: 'Rahul Sundaram',
    qrCodeData: 'FAIRFLASH:FF2026093841:TKT-782104',
    status: 'valid',
    price: 1999,
  },
  {
    id: 'TKT-782105',
    orderId: 'FF2026093841',
    eventId: 'evt-003',
    eventTitle: 'Zakir Khan: Live & Raw Comedy Special',
    eventDate: '2026-11-02',
    eventTime: '20:00',
    venueName: 'Sir Mutha Venkatasubba Rao Concert Hall',
    venueAddress: 'Harrington Road, Chetpet, Chennai',
    ticketTypeName: 'Auditorium Platinum',
    seatOrSection: 'Stalls - Row D, Seat 15',
    attendeeName: 'Priya Sundaram',
    qrCodeData: 'FAIRFLASH:FF2026093841:TKT-782105',
    status: 'valid',
    price: 1999,
  }
];

export interface CreateOrderPayload {
  eventId: string;
  items: { ticketTypeId: string; quantity: number }[];
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  paymentMethod: string;
}

export const ordersApi = {
  async createOrder(payload: CreateOrderPayload): Promise<{ order: Order; tickets: Ticket[] }> {
    await delay(1200); // Realistic payment process delay
    
    const event = mockEvents.find(e => e.id === payload.eventId);
    if (!event) throw new Error("Selected event not found");

    const orderId = `FF202609${Math.floor(1000 + Math.random() * 9000)}`;
    let subtotal = 0;
    const orderItems: OrderItem[] = payload.items.map(item => {
      const type = event.ticketTypes.find(t => t.id === item.ticketTypeId);
      const unitPrice = type?.price || 0;
      const total = unitPrice * item.quantity;
      subtotal += total;
      return {
        ticketTypeId: item.ticketTypeId,
        ticketTypeName: type?.name || 'General Admission',
        unitPrice,
        quantity: item.quantity,
        totalPrice: total,
      };
    });

    const bookingFee = Math.round(subtotal * 0.06);
    const taxes = Math.round((subtotal + bookingFee) * 0.18);
    const grandTotal = subtotal + bookingFee + taxes;

    const generatedTickets: Ticket[] = [];
    payload.items.forEach(item => {
      const type = event.ticketTypes.find(t => t.id === item.ticketTypeId);
      for (let i = 0; i < item.quantity; i++) {
        const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
        const ticket: Ticket = {
          id: ticketId,
          orderId,
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.date,
          eventTime: event.time,
          venueName: event.venue.name,
          venueAddress: `${event.venue.address}, ${event.venue.city}`,
          ticketTypeName: type?.name || 'General Admission',
          seatOrSection: `Sec ${String.fromCharCode(65 + i)} - Row ${i + 1}, Seat ${12 + i}`,
          attendeeName: payload.customer.fullName,
          qrCodeData: `FAIRFLASH:${orderId}:${ticketId}`,
          status: 'valid',
          price: type?.price || 0,
        };
        generatedTickets.push(ticket);
        localTickets.unshift(ticket);
      }
    });

    const newOrder: Order = {
      id: orderId,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      venueName: event.venue.name,
      venueCity: event.venue.city,
      bannerImage: event.bannerImage,
      items: orderItems,
      subtotal,
      bookingFee,
      taxes,
      grandTotal,
      currency: 'INR',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      customer: payload.customer,
      paymentMethod: payload.paymentMethod,
      ticketIds: generatedTickets.map(t => t.id),
    };

    localOrders.unshift(newOrder);
    return { order: newOrder, tickets: generatedTickets };
  },

  async getOrders(): Promise<Order[]> {
    await delay(350);
    return [...localOrders];
  },

  async getOrderById(id: string): Promise<Order> {
    await delay(300);
    const order = localOrders.find(o => o.id === id);
    if (!order) throw new Error(`Order #${id} not found.`);
    return order;
  }
};

export const ticketsApi = {
  async getTickets(): Promise<Ticket[]> {
    await delay(300);
    return [...localTickets];
  },

  async getTicketById(id: string): Promise<Ticket> {
    await delay(250);
    const ticket = localTickets.find(t => t.id === id);
    if (!ticket) throw new Error(`Ticket #${id} not found.`);
    return ticket;
  }
};
