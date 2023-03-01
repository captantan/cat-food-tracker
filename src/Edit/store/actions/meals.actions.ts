import { createAction } from "@reduxjs/toolkit";
import { Meal, MealEntry } from "../../models/meal";

const actionPrefix = '[Meals] ';

export const editMeal = createAction<string /* guid */>(actionPrefix + 'Edit');
export const newMeal = createAction<{date: string | null, meal: Meal | null}>(actionPrefix + 'New');
export const saveMeal = createAction<MealEntry>(actionPrefix + 'Save');
export const cancelEditMeal = createAction(actionPrefix + 'Cancel');