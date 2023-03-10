import { createReducer } from '@reduxjs/toolkit';
import { fileActions } from '../actions';
import { FileInfoState } from '../state/file-info.state';

export const fileInfoReducer = createReducer<FileInfoState | null>(
  null,
  (builder) =>
    builder
      .addCase(fileActions.loadFileStarted, (_state, _action) => null)
      .addCase(
        fileActions.loadFileInfoSucceeded,
        (_state, action) => action.payload,
      ),
);
