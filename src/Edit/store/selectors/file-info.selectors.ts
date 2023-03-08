import { createSelector } from "reselect";
import { State } from "../../../store/state";

const featureState = (state: State) => state.edit.fileInfo;

export const fileName = createSelector(featureState, (f) => f?.name ?? null);
export const path = createSelector(featureState, (f) => f?.path);