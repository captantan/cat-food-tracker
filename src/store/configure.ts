import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import { State } from './state';

export const store = configureStore({
  reducer: rootReducer,
  enhancers: composeWithDevTools({}),
})