import { Router, Request, Response } from 'express';
import { orderEngine } from '../services/orderEngine.js';

export const ticketsRouter = Router();

// GET /api/tickets
ticketsRouter.get('/', (_req: Request, res: Response) => {
  try {
    const tickets = orderEngine.getAllTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/tickets/:id
ticketsRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const ticket = orderEngine.getTicketById(id);
    if (!ticket) {
      res.status(404).json({ error: `Ticket #${id} not found` });
      return;
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
