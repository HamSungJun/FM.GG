import {createStore, combineReducers, applyMiddleware} from 'redux';
import {logger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import * as saga from './saga.js';
import appReducer from './reducer.js'

const sagaMiddleWare = createSagaMiddleware();

let store = createStore(appReducer,applyMiddleware(logger,sagaMiddleWare));

sagaMiddleWare.run(saga.helloSaga);

export default store;