import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
// import { loggerMiddleware } from './middleware/logger';
import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  withlist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleware));

// root reducer
export const store = createStore(persistedReducer, undefined, composeEnhancers);
// persistor object
export const persistor = persistStore(store);
