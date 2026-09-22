import { Router, Request, Response } from 'express';
import { queueEngine } from '../services/queueEngine.js';
import { QueueStatus } from '../types/index.js';

export const queueRouter = Router();

// POST /api/queue/join
queueRouter.post('/join', (req: Request, res: Response) => {
  try {
    const { eventId } = req.body;
    if (!eventId) {
      res.status(400).json({ error: 'eventId is required' });
      return;
    }
    const session = queueEngine.joinQueue(eventId);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/queue/:queueId
queueRouter.get('/:queueId', (req: Request, res: Response) => {
  try {
    const queueId = req.params.queueId as string;
    const session = queueEngine.getQueueSession(queueId);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/queue/:queueId/leave
queueRouter.post('/:queueId/leave', (req: Request, res: Response) => {
  try {
    const queueId = req.params.queueId as string;
    const success = queueEngine.leaveQueue(queueId);
    res.json({ success });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/queue/:queueId/test-status (for UI demo tester)
queueRouter.post('/:queueId/test-status', (req: Request, res: Response) => {
  try {
    const queueId = req.params.queueId as string;
    const { status } = req.body;
    const session = queueEngine.setQueueStatusForTesting(queueId, status as QueueStatus);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
