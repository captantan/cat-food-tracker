import { createSelector } from "reselect";
import { State } from "../../../store/state";

const uiFeatureSelector = (state: State) => state.edit.ui;

export const drawerOpen = createSelector(uiFeatureSelector, (ui) => ui.drawerOpen);