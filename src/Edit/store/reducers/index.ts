import {combineReducers} from '@reduxjs/toolkit';
import { EditState } from '../state';
import { brandsReducer } from './brands';
import { mealsReducer } from './meals';
import { uiReducer } from './ui.reducer';

export const editFeatureReducer = combineReducers<EditState>({
  brands: brandsReducer,
  meals: mealsReducer,
  ui: uiReducer
})