import { Order, OrderItem, Ticket, CustomerDetails } from '../types/index.js';
import { seedOrders, seedTickets } from '../data/seedEvents.js';
import { eventsService } from './eventsService.js';

export interface CreateOrderDTO {
  eventId: string;
  items: { ticketTypeId: string; quantity: number }[];
  customer: CustomerDetails;
  paymentMethod: string;
}

class OrderEngine {
  private orders: Order[] = [...seedOrders];
  private tickets: Ticket[] = [...seedTickets];

  public createOrder(dto: CreateOrderDTO): { order: Order; tickets: Ticket[] } {
    const event = eventsService.getEventById(dto.eventId);
    if (!event) {
      throw new Error(`Event not found with ID: ${dto.eventId}`);
    }

    const orderId = `FF202609${Math.floor(1000 + Math.random() * 9000)}`;
    let subtotal = 0;

    const orderItems: OrderItem[] = dto.items.map(item => {
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
    dto.items.forEach(item => {
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
          attendeeName: dto.customer.fullName,
          qrCodeData: `FAIRFLASH:${orderId}:${ticketId}`,
          status: 'valid',
          price: type?.price || 0,
        };
        generatedTickets.push(ticket);
        this.tickets.unshift(ticket);
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
      customer: dto.customer,
      paymentMethod: dto.paymentMethod,
      ticketIds: generatedTickets.map(t => t.id),
    };

    this.orders.unshift(newOrder);
    return { order: newOrder, tickets: generatedTickets };
  }

  public getAllOrders(): Order[] {
    return [...this.orders];
  }

  public getOrderById(id: string): Order | null {
    const order = this.orders.find(o => o.id === id);
    return order || null;
  }

  public getAllTickets(): Ticket[] {
    return [...this.tickets];
  }

  public getTicketById(id: string): Ticket | null {
    const ticket = this.tickets.find(t => t.id === id);
    return ticket || null;
  }
}

export const orderEngine = new OrderEngine();
