export const checkIfWeekend = (dateString: string): boolean => {
  const date = new Date(dateString)
  const dayOfWeek = date.getDay()
  return dayOfWeek === 6 || dayOfWeek === 0
}
