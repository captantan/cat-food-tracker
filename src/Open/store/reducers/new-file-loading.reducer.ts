import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '../../../loading.state';
import { loadingActions, newFileActions } from '../actions';

export const newFileLoadingReducer = createReducer<LoadingState>(
  { status: 'none', error: null },
  (builder) =>
    builder
      .addCase(newFileActions.createStarted, (state, _action) => ({
        ...state,
        status: 'loading',
        error: null,
      }))
      .addCase(newFileActions.createFailed, (state, action) => ({
        ...state,
        status: 'error',
        error: action.payload,
      }))
      .addCase(newFileActions.createSucceeded, (state, _action) => ({
        ...state,
        status: 'done',
        error: null,
      }))
      .addCase(loadingActions.loadContentSucceeded, (_state, _action) => ({
        status: 'none',
        error: null,
      })),
);
