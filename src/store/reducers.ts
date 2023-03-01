import { combineReducers } from "redux";
import { editFeatureReducer } from "../Edit/store/reducers";

export const rootReducer = combineReducers({
  edit: editFeatureReducer,
})