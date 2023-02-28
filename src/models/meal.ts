export enum Meal {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Snack = 'snack',
}

export enum EatenAmount {
  Unknown = 'unknown',
  None = 'none',
  Little = 'little',
  Some = 'some',
  Half = 'half',
  Most = 'most',
  All = 'all'
}

export const eatenAmountDisplays: Record<EatenAmount, string> = {
  [EatenAmount.Unknown]: 'Unknown',
  [EatenAmount.None]: 'None',
  [EatenAmount.Little]: 'Little',
  [EatenAmount.Some]: 'Some',
  [EatenAmount.Half]: 'Half',
  [EatenAmount.Most]: 'Most',
  [EatenAmount.All]: 'All',
}

export interface MealEntry {
  id: string; /* guid */
  date: string; /* formatISO(date, {representation: 'date'}) / parseISO */
  meal: Meal;
  order: number; // used to sort if multiple entries for the same meal/day

  brand: string; /* guid - brand -> id */
  flavor: string; /* guid -> brand -> flavor -> id */

  amount: EatenAmount | null;
  notes: string;
}

export interface MealFormModel {
  date: Date;
  meal: Meal;
  amount: EatenAmount | '';

  brand: string;
  flavor: string;

  notes: string;
}
