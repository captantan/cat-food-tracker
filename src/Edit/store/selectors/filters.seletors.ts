import { createSelector } from 'reselect';
import { State } from '../../../store/state';

const featureSelector = (state: State) => state.edit.filters;

export const showResults = createSelector(
  featureSelector,
  (f) => f.showResults,
);
