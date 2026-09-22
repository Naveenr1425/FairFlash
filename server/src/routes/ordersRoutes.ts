import { Router, Request, Response } from 'express';
import { orderEngine, CreateOrderDTO } from '../services/orderEngine.js';

export const ordersRouter = Router();

// POST /api/orders
ordersRouter.post('/', (req: Request, res: Response) => {
  try {
    const { eventId, items, customer, paymentMethod } = req.body;

    if (!eventId || !items || !items.length || !customer) {
      res.status(400).json({ error: 'Missing required order fields' });
      return;
    }

    const payload: CreateOrderDTO = {
      eventId,
      items,
      customer,
      paymentMethod: paymentMethod || 'UPI (Instant Pay)',
    };

    const result = orderEngine.createOrder(payload);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/orders
ordersRouter.get('/', (_req: Request, res: Response) => {
  try {
    const orders = orderEngine.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/orders/:id
ordersRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const order = orderEngine.getOrderById(id);
    if (!order) {
      res.status(404).json({ error: `Order #${id} not found` });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
