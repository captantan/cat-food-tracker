import { createReducer } from "@reduxjs/toolkit";
import { LoadingState } from "../../../loading.state";
import { fileActions } from "../actions";

export const fileLoadingReducer = createReducer<LoadingState>({status: 'none', error: null}, (builder) => 
  builder.addCase(fileActions.loadFileStarted, (state, _action) => ({
    ...state,
    status: 'loading',
    error: null
  }))
  .addCase(fileActions.loadFileFailed, (state, action) => ({
    ...state, 
    status: 'error',
    error: action.payload
  }))
  .addCase(fileActions.loadFileSucceeded, (state, action) => ({
    ...state,
    status: 'done',
    error: null,
  }))
);
