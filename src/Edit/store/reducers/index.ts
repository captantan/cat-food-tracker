import { combineReducers } from '@reduxjs/toolkit';
import { EditState } from '../state';
import { brandsReducer } from './brands';
import { fileInfoReducer } from './file-info.reducer';
import { fileLoadingReducer } from './file-loading.reducer';
import { filterReducer } from './filter.reducer';
import { mealsReducer } from './meals';
import { saveReducer } from './save.reducer';
import { uiReducer } from './ui.reducer';

export const editFeatureReducer = combineReducers<EditState>({
  brands: brandsReducer,
  fileInfo: fileInfoReducer,
  fileLoading: fileLoadingReducer,
  filters: filterReducer,
  meals: mealsReducer,
  save: saveReducer,
  ui: uiReducer,
});
