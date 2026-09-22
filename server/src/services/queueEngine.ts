import { QueueSession, QueueStatus } from '../types/index.js';
import { eventsService } from './eventsService.js';

class QueueEngine {
  private sessions: Map<string, QueueSession> = new Map();

  public joinQueue(eventId: string): QueueSession {
    const event = eventsService.getEventById(eventId);

    // If event is not high demand, issue an instant ready pass
    if (!event?.isHighDemand) {
      const instantSession: QueueSession = {
        queueId: `q-instant-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        eventId: event?.id || eventId,
        position: 0,
        initialPosition: 0,
        estimatedWaitSeconds: 0,
        status: 'ready',
        joinedAt: Date.now(),
        token: `TKN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        expiresAt: Date.now() + 10 * 60 * 1000,
      };
      this.sessions.set(instantSession.queueId, instantSession);
      return instantSession;
    }

    const startPos = Math.floor(Math.random() * 12) + 5;
    const session: QueueSession = {
      queueId: `q-${eventId}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      eventId: event.id,
      position: startPos,
      initialPosition: startPos,
      estimatedWaitSeconds: startPos * 3,
      status: 'waiting',
      joinedAt: Date.now(),
    };

    this.sessions.set(session.queueId, session);
    return session;
  }

  public getQueueSession(queueId: string): QueueSession {
    const session = this.sessions.get(queueId);
    if (!session) {
      // Return a safe fallback ready session
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
  }

  public setQueueStatusForTesting(queueId: string, status: QueueStatus): QueueSession {
    let session = this.sessions.get(queueId);
    if (!session) {
      session = {
        queueId,
        eventId: 'evt-001',
        position: 5,
        initialPosition: 10,
        estimatedWaitSeconds: 15,
        status,
        joinedAt: Date.now(),
      };
      this.sessions.set(queueId, session);
    }

    session.status = status;
    if (status === 'ready') {
      session.position = 0;
      session.token = `TKN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      session.expiresAt = Date.now() + 10 * 60 * 1000;
    }

    return { ...session };
  }

  public leaveQueue(queueId: string): boolean {
    return this.sessions.delete(queueId);
  }
}

export const queueEngine = new QueueEngine();
