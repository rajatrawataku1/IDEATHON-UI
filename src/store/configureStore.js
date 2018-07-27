import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from '../middleware/api';
import logger from 'redux-logger'
import rootReducer from '../reducers';
import { ENV } from '../constants';

const apiEnv = process.env.API_ENV;

let createStoreWithMiddleware;

if (apiEnv === ENV.PROD) {
    createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
        apiMiddleware
    )(createStore);
} else {
    createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
        apiMiddleware,
        logger
    )(createStore);
}


export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}
