import { createSelector } from "reselect";
import { State } from "../state";

const uiFeatureSelector = (state: State) => state.ui;

export const drawerOpen = createSelector(uiFeatureSelector, (ui) => ui.drawerOpen);