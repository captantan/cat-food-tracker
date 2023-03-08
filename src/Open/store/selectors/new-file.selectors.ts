import { createSelector } from "reselect";
import { State } from "../../../store/state";

const featureState = (state: State) => state.open.newFile;

export const showModal = createSelector(featureState, (f) => f.showModal);
export const newPath = createSelector(featureState, (f) => f.newPath);