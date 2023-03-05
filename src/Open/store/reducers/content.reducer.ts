import { createReducer } from "@reduxjs/toolkit";
import { loadingActions } from "../actions";
import { ContentState } from "../state";

const initialState: ContentState = {
  folders: [],
  files: [],
}

export const contentReducer = createReducer<ContentState>(
  initialState,
  (builder) => builder
    .addCase(loadingActions.loadContentStarted, () => initialState)
    .addCase(loadingActions.loadContentSucceeded, (_state, action) => action.payload)
)