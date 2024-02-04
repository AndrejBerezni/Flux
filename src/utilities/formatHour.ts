export const formatHour = (hour: number, minute: number) =>
  `${hour.toString().padStart(2, '0')}:${String(minute).padStart(2, '0')}`
