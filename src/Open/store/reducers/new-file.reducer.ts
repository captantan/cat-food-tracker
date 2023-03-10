import { createReducer } from '@reduxjs/toolkit';
import { loadingActions, newFileActions } from '../actions';
import { CreateNewFileState } from '../state';

export const newFileReducer = createReducer<CreateNewFileState>(
  { showModal: false, newPath: null },
  (builder) =>
    builder
      .addCase(newFileActions.openDialog, (state, _action) => ({
        ...state,
        showModal: true,
      }))
      .addCase(newFileActions.closeDialog, (state, _action) => ({
        ...state,
        showModal: false,
      }))
      .addCase(newFileActions.createStarted, (state, action) => ({
        ...state,
        showModal: false,
        newPath: action.payload,
      }))
      .addCase(loadingActions.loadContentSucceeded, (_state, _action) => ({
        showModal: false,
        newPath: null,
      })),
);
