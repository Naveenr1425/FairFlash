import { QueueSession } from '@/types/queue';
import { mockEvents } from '@/data/mockEvents';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const queueStore: Record<string, QueueSession> = {};

export const queueApi = {
  async joinQueue(eventId: string): Promise<QueueSession> {
    await delay(400);
    const event = mockEvents.find(e => e.id === eventId || e.slug === eventId);
    
    // Non-high demand events bypass queue
    if (!event?.isHighDemand) {
      const instantSession: QueueSession = {
        queueId: `q-instant-${Date.now()}`,
        eventId: event?.id || eventId,
        position: 0,
        initialPosition: 0,
        estimatedWaitSeconds: 0,
        status: 'ready',
        joinedAt: Date.now(),
        token: `TKN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        expiresAt: Date.now() + 10 * 60 * 1000,
      };
      queueStore[instantSession.queueId] = instantSession;
      return instantSession;
    }

    // High demand starts in waiting position
    const startPos = Math.floor(Math.random() * 12) + 5; // 5 to 16 positions
    const session: QueueSession = {
      queueId: `q-${eventId}-${Date.now()}`,
      eventId: event.id,
      position: startPos,
      initialPosition: startPos,
      estimatedWaitSeconds: startPos * 3,
      status: 'waiting',
      joinedAt: Date.now(),
    };
    queueStore[session.queueId] = session;
    return session;
  },

  async getQueuePosition(queueId: string): Promise<QueueSession> {
    await delay(300);
    const session = queueStore[queueId];
    if (!session) {
      // Create a fallback ready session if queue was lost during testing
      return {
        queueId,
        eventId: 'evt-001',
        position: 0,
        initialPosition: 5,
        estimatedWaitSeconds: 0,
        status: 'ready',
        joinedAt: Date.now(),
        token: `TKN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        expiresAt: Date.now() + 10 * 60 * 1000,
      };
    }

    if (session.status === 'waiting') {
      if (session.position > 1) {
        // Decrement position by 1 to 2
        session.position -= Math.floor(Math.random() * 2) + 1;
        if (session.position < 1) session.position = 1;
        session.estimatedWaitSeconds = Math.max(2, session.position * 3);
      } else {
        session.position = 0;
        session.status = 'ready';
        session.estimatedWaitSeconds = 0;
        session.token = `TKN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
        session.expiresAt = Date.now() + 10 * 60 * 1000;
      }
    }

    return { ...session };
  },

  async setQueueStatusForTesting(queueId: string, status: QueueSession['status']): Promise<QueueSession> {
    await delay(100);
    if (!queueStore[queueId]) {
      queueStore[queueId] = {
        queueId,
        eventId: 'evt-001',
        position: 5,
        initialPosition: 10,
        estimatedWaitSeconds: 15,
        status,
        joinedAt: Date.now(),
      };
    }
    queueStore[queueId]!.status = status;
    if (status === 'ready') {
      queueStore[queueId]!.position = 0;
      queueStore[queueId]!.token = `TKN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      queueStore[queueId]!.expiresAt = Date.now() + 10 * 60 * 1000;
    }
    return { ...queueStore[queueId]! };
  },

  async leaveQueue(queueId: string): Promise<{ success: boolean }> {
    await delay(150);
    delete queueStore[queueId];
    return { success: true };
  }
};
