import {combineReducers} from '@reduxjs/toolkit';
import { State } from '../state';
import { brandsReducer } from './brands';
import { mealsReducer } from './meals';
import { uiReducer } from './ui.reducer';

export const rootReducer = combineReducers<State>({
  brands: brandsReducer,
  meals: mealsReducer,
  ui: uiReducer
})