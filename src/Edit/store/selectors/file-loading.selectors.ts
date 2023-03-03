import { createSelector } from "reselect";
import { State } from "../../../store/state";
import { ascend, sort } from 'ramda';

const featureState = (state: State) => state.edit.fileLoading;

export const status = createSelector(featureState, (f) => {
  switch(f.status) {
    case 'none':
    case 'loading':
      return 'loading';
    case 'error':
      return 'error';
    case 'done': 
      return 'done';
  }
});

export const error = createSelector(featureState, (f) => f.error);
