export const extractDayMonth = (date: Date | string): string =>
  date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
