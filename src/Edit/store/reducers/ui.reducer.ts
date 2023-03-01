import { createReducer } from "@reduxjs/toolkit";
import { uiActions } from "../actions";
import { UIState } from "../state";

export const uiReducer = createReducer<UIState>({drawerOpen: false}, (builder) => 
  builder.addCase(uiActions.toggleDrawer, (state, _action) => ({...state, drawerOpen: !state.drawerOpen}))
    .addCase(uiActions.closeDrawer, (state, _action) => ({...state, drawerOpen: false}))
);
