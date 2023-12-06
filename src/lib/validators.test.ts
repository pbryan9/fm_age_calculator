import { describe, test, expect } from 'vitest';
import { monthIsValid, yearIsValid, dayIsValid } from './validators';

describe('monthIsValid', () => {
  test('should return true if passed-in number is a valid month (1-indexed)', () => {
    expect(monthIsValid(1)).toBe(true);
    expect(monthIsValid(12)).toBe(true);
  });

  test('should return false if passed-in number is negative', () => {
    expect(monthIsValid(-1)).toBe(false);
  });

  test('should return false if passed-in number is zero', () => {
    expect(monthIsValid(0)).toBe(false);
  });

  test('should return false if passed-in number is out of range', () => {
    expect(monthIsValid(13)).toBe(false);
  });
});

describe('yearIsValid', () => {
  test('should return true if passed-in number is a valid year', () => {
    expect(yearIsValid(1)).toBe(true);
    expect(yearIsValid(12)).toBe(true);
    expect(yearIsValid(2023)).toBe(true);
    expect(yearIsValid(1900)).toBe(true);
    expect(yearIsValid(2000)).toBe(true);
    expect(yearIsValid(2022)).toBe(true);
  });

  test('should return false if passed-in number is negative', () => {
    expect(yearIsValid(-1)).toBe(false);
  });

  test('should return false if passed-in number is zero', () => {
    expect(yearIsValid(0)).toBe(false);
  });

  test('should return false if passed-in number is in the future', () => {
    expect(yearIsValid(2433)).toBe(false);
    expect(yearIsValid(2024)).toBe(false);
  });
});

describe('dayIsValid', () => {
  test('should return true if passed-in number is a valid day', () => {
    expect(dayIsValid(1, 5)).toBe(true);
    expect(dayIsValid(15, 5)).toBe(true);
  });

  test('should return false if passed-in number is negative', () => {
    expect(dayIsValid(-1, 5)).toBe(false);
  });

  test('should return false if passed-in number is zero', () => {
    expect(dayIsValid(0, 5)).toBe(false);
  });

  test('should return true if 31 is given on long months', () => {
    expect(dayIsValid(31, 12)).toBe(true);
  });
});
