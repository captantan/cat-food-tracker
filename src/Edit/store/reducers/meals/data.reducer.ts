import { createReducer } from '@reduxjs/toolkit';
import { fileActions, mealActions } from '../../actions';
import { MealListState } from '../../state';

export const mealDataReducer = createReducer<MealListState>({}, (builder) =>
  builder
    .addCase(mealActions.saveMeal, (state, action) => ({
      ...state,
      [action.payload.id]: action.payload,
    }))
    .addCase(
      fileActions.loadFileSucceeded,
      (_state, action) => action.payload.meals,
    )
    .addCase(mealActions.yesDelete, (state, action) => {
      const mealToDelete = state[action.payload];

      if (!mealToDelete) {
        // meal not found, so noop
        return state;
      }

      return Object.values(state).reduce((newState, meal) => {
        if (meal.id !== action.payload) {
          if (
            meal.date === mealToDelete.date &&
            meal.meal === mealToDelete.meal
          ) {
            if (meal.order > mealToDelete.order) {
              newState[meal.id] = { ...meal, order: meal.order - 1 };
            } else {
              newState[meal.id] = meal;
            }
          } else {
            newState[meal.id] = meal;
          }
        }

        return newState;
      }, {} as MealListState);
    }),
);
