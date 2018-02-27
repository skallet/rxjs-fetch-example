import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import fetch from './reducers/fetch.js';
import { fetchEpic } from './epics/fetch.js';

export const rootEpic = combineEpics(
  fetchEpic,
);

export const rootReducer = combineReducers({
  fetch,
});
