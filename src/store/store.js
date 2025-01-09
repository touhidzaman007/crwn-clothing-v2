import { compose, createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

// middleware

const loggerMiddleware = store => next => action => {
  if (!action.type) return next(action);

  // If action.type called
  console.group('type: ', action.type);
  console.log('payload: ', action.payload);
  // Log the current state
  console.log('currentState: ', store.getState());
  // Then store gets updated
  next(action);
  // Log the next state
  console.log('nextState: ', store.getState());
  // End the group
  console.groupEnd();
};
const middleware = [loggerMiddleware];
const composeEnhancers = compose(applyMiddleware(...middleware));

// root reducer
export const store = createStore(rootReducer, undefined, composeEnhancers);
