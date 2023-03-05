import { combineReducers } from "redux";
import { editFeatureReducer } from "../Edit/store/reducers";
import { openReducer } from "../Open/store/reducers";

export const rootReducer = combineReducers({
  edit: editFeatureReducer,
  open: openReducer,
})