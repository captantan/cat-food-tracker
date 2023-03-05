import { combineReducers } from "redux";
import { OpenState } from "../state";
import { contentReducer } from "./content.reducer";
import { loadingReducer } from "./loading.reducer";

export const openReducer = combineReducers<OpenState>({
  loading: loadingReducer,
  content: contentReducer,
})