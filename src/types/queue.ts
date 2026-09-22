export type QueueStatus = 
  | 'waiting' 
  | 'ready' 
  | 'paused' 
  | 'expired' 
  | 'sold_out' 
  | 'error';

export interface QueueSession {
  queueId: string;
  eventId: string;
  position: number;
  initialPosition: number;
  estimatedWaitSeconds: number;
  status: QueueStatus;
  joinedAt: number;
  expiresAt?: number;
  token?: string;
  errorMessage?: string;
}
