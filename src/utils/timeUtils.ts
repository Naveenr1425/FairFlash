export function formatCountdown(secondsRemaining: number): string {
  if (secondsRemaining <= 0) return '00:00';
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function formatWaitTime(seconds: number): string {
  if (seconds <= 0) return 'Less than a minute';
  if (seconds < 60) return `~${seconds} seconds`;
  const mins = Math.ceil(seconds / 60);
  return `~${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
}
