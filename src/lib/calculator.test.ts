import { describe, expect, test } from 'vitest';

import calculateAge, {
  calculateDaysBetween,
  calculateMonthsBetween,
  calculateYearsBetween,
  oneDayBefore,
} from './calculator';

const TEST_DATE = new Date(2023, 11, 5);

describe('calculate age', () => {
  test('should return an object containing years, months, and days since birth date', () => {
    const returnAge = calculateAge(29, 11, 1984);
    expect(returnAge).toHaveProperty('years');
    expect(returnAge).toHaveProperty('months');
    expect(returnAge).toHaveProperty('days');
  });

  test('should calculate the correct number of years if birthday has already passed', () => {
    const pattyAge = calculateAge(29, 11, 1984, TEST_DATE);
    expect(pattyAge.years).toBe(39);
  });

  test('should calculate the correct number of years if birthday has not already passed', () => {
    const steffyAge = calculateAge(6, 12, 1983, TEST_DATE);
    expect(steffyAge.years).toBe(39);
    expect(steffyAge.months).toBe(11);
    expect(steffyAge.days).toBe(30);
  });

  test('should calculate the correct number of months', () => {
    const tashaAge = calculateAge(6, 4, 1986);
    expect(tashaAge.months).toBe(7);

    const anastasiaAge = calculateAge(31, 7, 1993);
    expect(anastasiaAge.months).toBe(4);

    const test3 = calculateAge(1, 1, 1993);
    expect(test3.months).toBe(11);
  });

  test('should calculate the correct years, months, and days since a date', () => {
    const test1 = calculateAge(31, 7, 1993, new Date(2023, 11, 5));
    expect(test1.years).toBe(30);
    expect(test1.months).toBe(4);
    expect(test1.days).toBe(5);
  });
});

describe('unit tests', () => {
  describe('oneDayBefore', () => {
    test('should return the date one day previous to a middle-of-month input', () => {
      expect(oneDayBefore(new Date(1993, 6, 15))).toStrictEqual(
        new Date(1993, 6, 14)
      );
    });

    test('should return the date one day previous to a beginning-of-month input', () => {
      expect(oneDayBefore(new Date(1993, 6, 1))).toStrictEqual(
        new Date(1993, 5, 30)
      );

      expect(oneDayBefore(new Date(1993, 2, 1))).toStrictEqual(
        new Date(1993, 1, 28)
      );
    });

    test('should return the date one day previous to a beginning-of-year input', () => {
      expect(oneDayBefore(new Date(1993, 0, 1))).toStrictEqual(
        new Date(1992, 11, 31)
      );
    });
  });

  describe('calculateYearsBetween', () => {
    test('should return correct number of years if we have already had a birthday this year', () => {
      expect(
        calculateYearsBetween(new Date(2023, 7, 15), new Date(2024, 8, 2))
      ).toBe(1);
    });

    test('should return correct number of years if we have not had a birthday yet this year', () => {
      expect(
        calculateYearsBetween(new Date(2023, 8, 2), new Date(2024, 7, 15))
      ).toBe(0);
    });

    test('should work for multiple year span', () => {
      expect(
        calculateYearsBetween(new Date(2023, 8, 2), new Date(2027, 7, 15))
      ).toBe(3);
    });

    test('should throw if we pass dates in incorrect sequence', () => {
      expect(() =>
        calculateYearsBetween(new Date(2027, 7, 15), new Date(2023, 8, 2))
      ).toThrowError();
    });

    test('should return correct number of years the day before anniversary', () => {
      expect(calculateYearsBetween(new Date(1983, 11, 6), TEST_DATE)).toBe(39);
    });

    test("should correctly calculate anastasia's age", () => {
      expect(calculateYearsBetween(new Date(1993, 6, 31), TEST_DATE)).toBe(30);
    });
  });

  describe('calculateMonthsBetween', () => {
    test("should return correct number of months if we're later in month", () => {
      const test1 = calculateMonthsBetween(
        new Date(2023, 7, 15),
        new Date(2024, 6, 16)
      );
      expect(test1).toBe(11);

      const test2 = calculateMonthsBetween(
        new Date(2022, 2, 2),
        new Date(2022, 3, 30)
      );
      expect(test2).toBe(1);

      const test3 = calculateMonthsBetween(
        new Date(1999, 11, 15),
        new Date(2000, 0, 16)
      );
      expect(test3).toBe(1);

      const test4 = calculateMonthsBetween(
        new Date(1986, 3, 6),
        new Date(2023, 11, 4)
      );
      expect(test4).toBe(7);
    });

    const test3 = calculateMonthsBetween(
      new Date(1999, 11, 15),
      new Date(2000, 6, 17)
    );
    expect(test3).toBe(7);

    test("should return correct number of months if we're earlier in the month", () => {
      const test1 = calculateMonthsBetween(
        new Date(2022, 6, 15),
        new Date(2022, 7, 13)
      );
      expect(test1).toBe(0);

      const test2 = calculateMonthsBetween(
        new Date(1999, 11, 15),
        new Date(2000, 6, 12)
      );
      expect(test2).toBe(6);
    });

    test("should return correct number of months if we're on same day of month", () => {
      const test1 = calculateMonthsBetween(
        new Date(2022, 6, 15),
        new Date(2022, 7, 15)
      );
      expect(test1).toBe(1);

      const test2 = calculateMonthsBetween(
        new Date(1999, 11, 15),
        new Date(2000, 6, 15)
      );
      expect(test2).toBe(7);
    });

    test('should work across an arbitrary number of years', () => {
      const test1 = calculateMonthsBetween(
        new Date(2014, 6, 15),
        new Date(2022, 7, 15)
      );
      expect(test1).toBe(1);

      const test2 = calculateMonthsBetween(
        new Date(1999, 11, 15),
        new Date(2099, 6, 15)
      );
      expect(test2).toBe(7);
    });

    test('should return zero if later in same month', () => {
      const test1 = calculateMonthsBetween(
        new Date(2002, 11, 5),
        new Date(2002, 11, 12)
      );

      expect(test1).toBe(0);
    });

    test('should return 11 if earlier in same month', () => {
      const test1 = calculateMonthsBetween(
        new Date(2002, 11, 5),
        new Date(2003, 11, 4)
      );

      expect(test1).toBe(11);
    });

    test('should error if start is later than end', () => {
      expect(() =>
        calculateMonthsBetween(new Date(2099, 6, 15), new Date(1999, 11, 15))
      ).toThrowError();
    });
  });

  describe('calculateDaysBetween', () => {
    test('should throw an error if start date is after end date', () => {
      expect(() =>
        calculateDaysBetween(new Date(), new Date(2002, 5, 5))
      ).toThrowError();
    });

    test('should give correct number of days within same month', () => {
      const test1 = calculateDaysBetween(
        new Date(2023, 11, 10),
        new Date(2023, 11, 20)
      );
      expect(test1).toBe(10);
    });

    test('should calculate correct number of days from previous month', () => {
      const test1 = calculateDaysBetween(
        new Date(2023, 10, 10),
        new Date(2023, 11, 20)
      );
      expect(test1).toBe(10);

      const test2 = calculateDaysBetween(
        new Date(2023, 10, 10),
        new Date(2023, 11, 9)
      );
      expect(test2).toBe(29);
    });
  });
});
