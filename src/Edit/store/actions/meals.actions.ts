import { createAction } from '@reduxjs/toolkit';
import { editActionPrefix } from '../../feature.const';
import { Meal, MealEntry } from '../../models/meal';

const actionPrefix = editActionPrefix + '[Meals] ';

export const editMeal = createAction<string /* guid */>(actionPrefix + 'Edit');
export const newMeal = createAction<{ date: string | null; meal: Meal | null }>(
  actionPrefix + 'New',
);
export const saveMeal = createAction<MealEntry>(actionPrefix + 'Save');
export const cancelEditMeal = createAction(actionPrefix + 'Cancel');

export const deleteMeal = createAction(actionPrefix + 'Delete');
export const noDelete = createAction(actionPrefix + 'No Delete');
export const yesDelete = createAction<string /* mealId */>(
  actionPrefix + 'Yes Delete',
);
