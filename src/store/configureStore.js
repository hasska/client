import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger()),
  );
  return store
}
