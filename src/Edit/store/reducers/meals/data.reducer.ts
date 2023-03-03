import { createReducer } from "@reduxjs/toolkit";
import { fileActions, mealActions } from "../../actions";
import { MealListState } from "../../state";

export const mealDataReducer = createReducer<MealListState>(
  {},
  (builder) => builder
    .addCase(
      mealActions.saveMeal,
      (state, action) => ({ ...state, [action.payload.id]: action.payload })
    )
    .addCase(
      fileActions.loadFileSucceeded,
      (_state, action) => action.payload.meals
    )
);
