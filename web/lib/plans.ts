export function mapsSearchUrl(location: string): string {
  return `https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query: location.trim() })}`;
}

// A date-only value represents the destination's calendar day, not a UTC instant.
export function parseTripDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 2000 || year > 2100) return null;
  const result = new Date(year, month - 1, day);
  return result.getFullYear() === year && result.getMonth() === month - 1 && result.getDate() === day ? result : null;
}

export function validateTripDates(start: string, end: string): string | null {
  const first = parseTripDate(start);
  const last = parseTripDate(end);
  if (!first || !last) return 'Choose valid start and end dates between 2000 and 2100.';
  if (end < start) return 'End date must be on or after the start date.';
  const days = (Date.UTC(last.getFullYear(), last.getMonth(), last.getDate()) - Date.UTC(first.getFullYear(), first.getMonth(), first.getDate())) / 86400000;
  return days > 365 ? 'Choose a trip of one year or less.' : null;
}
