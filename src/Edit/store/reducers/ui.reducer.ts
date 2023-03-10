import { createReducer } from '@reduxjs/toolkit';
import { brandsActions, fileActions, mealActions, uiActions } from '../actions';
import { UIState } from '../state';

export const uiReducer = createReducer<UIState>(
  { drawerOpen: false, unsavedChanges: false },
  (builder) =>
    builder
      .addCase(uiActions.toggleDrawer, (state, _action) => ({
        ...state,
        drawerOpen: !state.drawerOpen,
      }))
      .addCase(uiActions.closeDrawer, (state, _action) => ({
        ...state,
        drawerOpen: false,
      }))
      .addMatcher(
        (action) =>
          action.type === fileActions.loadFileSucceeded.type ||
          action.type === fileActions.saveFileSucceeded.type,
        (state, _action) => ({
          ...state,
          drawerOpen: false,
          unsavedChanges: false,
        }),
      )
      .addMatcher(
        (action) =>
          [
            brandsActions.saveBrand.type,
            brandsActions.saveFlavor.type,
            mealActions.saveMeal.type,
            mealActions.deleteMeal.type,
          ].includes(action.type),
        (state, _action) => ({
          ...state,
          unsavedChanges: true,
        }),
      ),
);
