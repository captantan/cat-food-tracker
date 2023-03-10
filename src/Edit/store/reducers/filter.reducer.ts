import { createReducer } from '@reduxjs/toolkit';
import { filterActions } from '../actions';
import { FilterState } from '../state';

const defaultState: FilterState = { filter: null, showResults: false };

export const filterReducer = createReducer<FilterState>(
  defaultState,
  (builder) =>
    builder
      .addCase(filterActions.initPage, (_state, _action) => defaultState)
      .addCase(filterActions.viewResults, (state, action) => ({
        ...state,
        filter: action.payload,
        showResults: true,
      }))
      .addCase(filterActions.returnToForm, (state, _action) => ({
        ...state,
        showResults: false,
      })),
);
