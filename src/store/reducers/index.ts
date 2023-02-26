import {combineReducers} from '@reduxjs/toolkit';
import { State } from '../state';
import { brandsReducer } from './brands';
import { uiReducer } from './ui.reducer';

export const rootReducer = combineReducers<State>({
  brands: brandsReducer,
  ui: uiReducer
})