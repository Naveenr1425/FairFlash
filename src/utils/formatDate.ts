export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatShortDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatDayOfWeek(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
    }).format(date);
  } catch {
    return '';
  }
}

export function formatTime(time24: string): string {
  try {
    const [hoursStr, minutesStr] = time24.split(':');
    const hours = parseInt(hoursStr ?? '0', 10);
    const minutes = parseInt(minutesStr ?? '0', 10);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch {
    return time24;
  }
}
