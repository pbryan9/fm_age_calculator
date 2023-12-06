export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function monthIsValid(monthNumber: number): boolean {
  return monthNumber > 0 && monthNumber <= 12;
}

export function yearIsValid(year: number): boolean {
  return year > 0 && year <= new Date().getFullYear();
}

export function dayIsValid(day: number, monthNumber: number): boolean {
  if (day <= 0 || !monthIsValid(monthNumber)) return false;

  const daysInMonth = DAYS_IN_MONTH[monthNumber - 1];

  return day <= daysInMonth;
}
