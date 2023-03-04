import { createReducer } from "@reduxjs/toolkit";
import { fileActions } from "../actions";
import { LoadingState } from "../state";

export const saveReducer = createReducer<LoadingState>({status: 'none', error: null}, (builder) => 
  builder.addCase(fileActions.saveFileStarted, (state, _action) => ({
    ...state,
    status: 'loading',
    error: null
  }))
  .addCase(fileActions.saveFileFailed, (state, action) => ({
    ...state, 
    status: 'error',
    error: action.payload
  }))
  .addCase(fileActions.saveFileSucceeded, (state, _action) => ({
    ...state,
    status: 'done',
    error: null,
  }))
  .addCase(fileActions.returnToContent, (state, _action) => ({
    ...state,
    status: 'none',
    error: null,
  }))
);
