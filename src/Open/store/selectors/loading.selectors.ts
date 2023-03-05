import { createSelector } from "reselect";
import { State } from "../../../store/state";

const featureState = (state: State) => state.open.loading;

export const status = createSelector(featureState, (f) => {
  switch(f.status) {
    case 'none':
    case 'loading':
      return 'loading';
    case 'error':
      return 'error';
    case 'done': 
      return 'content';
  }
});

export const error = createSelector(featureState, (f) => f.error);