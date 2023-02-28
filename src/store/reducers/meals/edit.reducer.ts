import { createReducer } from "@reduxjs/toolkit";
import { mealActions } from "../../actions";
import { MealEditState } from "../../state";

export const mealEditReducer = createReducer<MealEditState>(
  { mealId: null, editOpen: false, prefillDate: null, prefillMeal: null },
  (builder) => builder
    .addCase(
      mealActions.editMeal,
      (state, action) => ({
        ...state, mealId: action.payload, editOpen: true, prefillDate: null, prefillMeal: null,
      })
    )
    .addCase(
      mealActions.newMeal,
      (state, action) => ({
        ...state, mealId: null, editOpen: true, prefillDate: action.payload.date, prefillMeal: action.payload.meal
      })
    )
    .addCase(
      mealActions.saveMeal,
      (state, _action) => ({
        ...state,
        editOpen: false,
      })
    )
    .addCase(
      mealActions.cancelEditMeal,
      (state, _action) => ({
        ...state,
        editOpen: false
      })
    )
);
