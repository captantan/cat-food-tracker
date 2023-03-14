import { createReducer } from '@reduxjs/toolkit';
import { FilterType } from '../../models/filter';
import { filterActions } from '../actions';
import { FilterState } from '../state';

const defaultState: FilterState = { filter: null, expandedBrands: [] };

export const filterReducer = createReducer<FilterState>(
  defaultState,
  (builder) =>
    builder
      .addCase(filterActions.initPage, (_state, _action) => defaultState)
      .addCase(filterActions.updateFilters, (state, action) => ({
        ...state,
        filter: action.payload,
        expandedBrands:
          action.payload.type === FilterType.Flavors
            ? state.expandedBrands
            : [],
      }))
      .addCase(filterActions.toggleBrandExpanded, (state, action) => ({
        ...state,
        expandedBrands: state.expandedBrands.includes(action.payload)
          ? state.expandedBrands.filter((eb) => eb !== action.payload)
          : [...state.expandedBrands, action.payload],
      })),
);
