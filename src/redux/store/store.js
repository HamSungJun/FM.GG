import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';
import summonerReducer from '../reducers/summonerReducer';
import rootSaga from '../sagas/saga';

const sagaMiddleware = createSagaMiddleware();

let appReducer = combineReducers({
    summoner : summonerReducer
});

let store = createStore(appReducer,applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;