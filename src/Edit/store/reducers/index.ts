import {combineReducers} from '@reduxjs/toolkit';
import { EditState } from '../state';
import { brandsReducer } from './brands';
import { fileLoadingReducer } from './file-loading.reducer';
import { mealsReducer } from './meals';
import { uiReducer } from './ui.reducer';

export const editFeatureReducer = combineReducers<EditState>({
  brands: brandsReducer,
  fileLoading: fileLoadingReducer,
  meals: mealsReducer,
  ui: uiReducer
})