import { Meal, MealEntry } from "../../models/meal";

export type MealListState = Record<string, MealEntry>;

export interface MealEditState {
  mealId: string | null; /* guid | null */
  editOpen: boolean;

  prefillDate: string | null, // same date format as MealEntry
  prefillMeal: Meal | null,

  confirmDelete: boolean;
}

export interface MealsState {
  data: MealListState;
  edit: MealEditState;
}
