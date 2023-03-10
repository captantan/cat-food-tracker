import { createSelector } from 'reselect';
import { State } from '../../../store/state';

const featureState = (state: State) => state.edit.fileLoading;
const saveFeatureState = (state: State) => state.edit.save;

export const status = createSelector(featureState, saveFeatureState, (f, s) => {
  switch (f.status) {
    case 'none':
    case 'loading':
      return 'loading';
    case 'error':
      return 'error';
    case 'done':
      switch (s.status) {
        case 'none':
          return 'content';
        case 'loading':
          return 'saving';
        case 'error':
          return 'save-failed';
        case 'done':
          return 'saved';
      }
  }
});

export const error = createSelector(featureState, (f) => f.error);
export const saveError = createSelector(saveFeatureState, (f) => f.error);
