import { DAYS_IN_MONTH } from './validators';

export type Age = {
  years: number;
  months: number;
  days: number;
};

export default function calculateAge(
  day: number,
  month: number,
  year: number,
  fromDate: Date = new Date()
): Age {
  const returnAge: Age = {
    years: 0,
    months: 0,
    days: 0,
  };

  // subtract 1 from month due to zero-indexing
  const birthDate = new Date(year, month - 1, day);

  returnAge.years = calculateYearsBetween(birthDate, fromDate);
  returnAge.months = calculateMonthsBetween(birthDate, fromDate);
  returnAge.days = calculateDaysBetween(birthDate, fromDate);

  return returnAge;
}

export function calculateYearsBetween(startDate: Date, endDate: Date): number {
  if (startDate > endDate) throw new Error('startDate must be before endDate');

  let yearsBetween = endDate.getFullYear() - startDate.getFullYear();

  if (startDate.getMonth() > endDate.getMonth()) {
    yearsBetween--;
  } else if (startDate.getMonth() === endDate.getMonth()) {
    if (startDate.getDate() >= endDate.getDate()) {
      yearsBetween--;
    }
  }

  return yearsBetween;
}

export function oneDayBefore(date: Date) {
  const prevDate = date;

  prevDate.setDate(prevDate.getDate() - 1);

  return prevDate;
}

export function calculateMonthsBetween(startDate: Date, endDate: Date): number {
  if (startDate > endDate) throw new Error('startDate must be before endDate');

  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();

  let monthsBetween = 0;

  if (startMonth === endMonth) {
    if (startDate.getDate() > endDate.getDate()) {
      monthsBetween = 12;
    } else {
      monthsBetween = 0;
    }
  } else if (startMonth > endMonth) {
    monthsBetween = 12 - startMonth + endMonth;
  } else {
    monthsBetween = endMonth - startMonth;
  }

  // reduce month count by 1 if start *date* is earlier than end date
  if (startDate.getDate() > endDate.getDate()) {
    monthsBetween--;
  }

  return monthsBetween;
}

export function calculateDaysBetween(startDate: Date, endDate: Date): number {
  if (startDate > endDate) throw new Error('start date must be after end date');

  let numberOfDays = 0;

  if (startDate.getDate() > endDate.getDate()) {
    numberOfDays =
      DAYS_IN_MONTH[startDate.getMonth()] -
      startDate.getDate() +
      endDate.getDate();
  } else {
    numberOfDays = endDate.getDate() - startDate.getDate();
  }

  return numberOfDays;
}
