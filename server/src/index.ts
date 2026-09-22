import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { eventsRouter } from './routes/eventsRoutes.js';
import { queueRouter } from './routes/queueRoutes.js';
import { ordersRouter } from './routes/ordersRoutes.js';
import { ticketsRouter } from './routes/ticketsRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'FairFlash Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/events', eventsRouter);
app.use('/api/queue', queueRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/tickets', ticketsRouter);

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`⚡ FairFlash Backend Server running on http://localhost:${PORT}`);
  console.log(`👉 API Health: http://localhost:${PORT}/api/health`);
});
