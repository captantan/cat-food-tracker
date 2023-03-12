import { createReducer } from '@reduxjs/toolkit';
import { filterActions } from '../actions';
import { FilterState } from '../state';

const defaultState: FilterState = { filter: null };

export const filterReducer = createReducer<FilterState>(
  defaultState,
  (builder) =>
    builder
      .addCase(filterActions.initPage, (_state, _action) => defaultState)
      .addCase(filterActions.updateFilters, (state, action) => ({
        ...state,
        filter: action.payload,
      })),
);
