import { combineReducers } from 'redux';
import { OpenState } from '../state';
import { contentReducer } from './content.reducer';
import { loadingReducer } from './loading.reducer';
import { newFileLoadingReducer } from './new-file-loading.reducer';
import { newFileReducer } from './new-file.reducer';

export const openReducer = combineReducers<OpenState>({
  loading: loadingReducer,
  content: contentReducer,
  newFile: newFileReducer,
  newFileLoading: newFileLoadingReducer,
});
