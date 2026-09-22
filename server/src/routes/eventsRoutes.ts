import { Router, Request, Response } from 'express';
import { eventsService, GetEventsFilters } from '../services/eventsService.js';

export const eventsRouter = Router();

// GET /api/events
eventsRouter.get('/', (req: Request, res: Response) => {
  try {
    const {
      city,
      category,
      search,
      isHighDemand,
      isFlashSale,
      minPrice,
      maxPrice,
    } = req.query;

    const filters: GetEventsFilters = {
      city: typeof city === 'string' ? city : undefined,
      category: typeof category === 'string' ? category : undefined,
      search: typeof search === 'string' ? search : undefined,
      isHighDemand: isHighDemand !== undefined ? isHighDemand === 'true' : undefined,
      isFlashSale: isFlashSale !== undefined ? isFlashSale === 'true' : undefined,
      minPrice: typeof minPrice === 'string' ? parseFloat(minPrice) : undefined,
      maxPrice: typeof maxPrice === 'string' ? parseFloat(maxPrice) : undefined,
    };

    const data = eventsService.getAllEvents(filters);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/events/featured
eventsRouter.get('/featured', (_req: Request, res: Response) => {
  try {
    const featured = eventsService.getFeaturedBannerEvents();
    res.json(featured);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/events/:id
eventsRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const event = eventsService.getEventById(id);
    if (!event) {
      res.status(404).json({ error: `Event '${id}' not found` });
      return;
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
