import { createSelector } from "reselect";
import { State } from "../../../store/state";

const featureState = (state: State) => state.open.loading;
const nfFeatureState = (state: State) => state.open.newFileLoading;

export const status = createSelector(featureState, nfFeatureState, (f, nf) => {
  switch (f.status) {
    case 'none':
    case 'loading':
      return 'loading';
    case 'error':
      return 'error';
    case 'done':
      switch (nf.status) {
        case 'none':
          return 'content'
        case 'loading':
          return 'creating';
        case 'error':
          return 'creation error';
        case 'done':
          return 'done';
      }
  }
});

export const error = createSelector(featureState, (f) => f.error);
export const newFileError = createSelector(nfFeatureState, (f) => f.error);