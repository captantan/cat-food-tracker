import { combineReducers } from 'redux';
import { BrandsState } from '../../state';
import { brandDataReducer } from './data.reducer';
import { brandEditReducer } from './edit.reducer';

export const brandsReducer = combineReducers<BrandsState>({
  data: brandDataReducer,
  edit: brandEditReducer,
});
