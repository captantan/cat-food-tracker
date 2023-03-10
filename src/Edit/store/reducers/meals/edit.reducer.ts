import { createReducer } from '@reduxjs/toolkit';
import { mealActions } from '../../actions';
import { MealEditState } from '../../state';

export const mealEditReducer = createReducer<MealEditState>(
  {
    mealId: null,
    editOpen: false,
    prefillDate: null,
    prefillMeal: null,
    confirmDelete: false,
  },
  (builder) =>
    builder
      .addCase(mealActions.editMeal, (state, action) => ({
        ...state,
        mealId: action.payload,
        editOpen: true,
        prefillDate: null,
        prefillMeal: null,
        confirmDelete: false,
      }))
      .addCase(mealActions.newMeal, (state, action) => ({
        ...state,
        mealId: null,
        editOpen: true,
        prefillDate: action.payload.date,
        prefillMeal: action.payload.meal,
        confirmDelete: false,
      }))
      .addCase(mealActions.saveMeal, (state, _action) => ({
        ...state,
        editOpen: false,
      }))
      .addCase(mealActions.cancelEditMeal, (state, _action) => ({
        ...state,
        editOpen: false,
      }))
      .addCase(mealActions.deleteMeal, (state, _action) => ({
        ...state,
        confirmDelete: true,
      }))
      .addCase(mealActions.noDelete, (state, _action) => ({
        ...state,
        confirmDelete: false,
      }))
      .addCase(mealActions.yesDelete, (state, _action) => ({
        ...state,
        editOpen: false,
      })),
);
