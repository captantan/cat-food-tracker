import { createReducer } from "@reduxjs/toolkit";
import { LoadingState } from "../../../loading.state";
import { loadingActions } from "../actions";

export const loadingReducer = createReducer<LoadingState>({status: 'none', error: null}, (builder) => 
  builder.addCase(loadingActions.loadContentStarted, (state, _action) => ({
    ...state,
    status: 'loading',
    error: null
  }))
  .addCase(loadingActions.loadContentFailed, (state, action) => ({
    ...state, 
    status: 'error',
    error: action.payload
  }))
  .addCase(loadingActions.loadContentSucceeded, (state, _action) => ({
    ...state,
    status: 'done',
    error: null,
  }))
);
