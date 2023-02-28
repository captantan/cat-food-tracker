import { combineReducers } from "redux";
import { MealsState } from "../../state";
import { mealDataReducer } from "./data.reducer";
import { mealEditReducer } from "./edit.reducer";

export const mealsReducer = combineReducers<MealsState>({
  data: mealDataReducer,
  edit: mealEditReducer,
});