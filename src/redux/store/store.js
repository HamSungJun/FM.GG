import {createStore, combineReducers, applyMiddleware} from 'redux';
import {logger} from 'redux-logger'

let store = createStore(appReducer,applyMiddleware(logger));

export default store;