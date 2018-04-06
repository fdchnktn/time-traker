import { createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers'
import { applyMiddleware } from '../../../../.cache/typescript/2.7/node_modules/redux';

const intialState = {};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(logger, thunk)
  )
);

export default store;