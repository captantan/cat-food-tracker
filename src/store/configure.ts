import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  enhancers: composeWithDevTools({}),
})