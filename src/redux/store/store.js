import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';

import summonerReducer from '../reducers/summonerReducer';
import lolStatusReducer from '../reducers/lolStatusReducer';
import leagueReducer from '../reducers/leagueReducer';
import mostPickReducer from '../reducers/mostPickReducer';

import rootSaga from '../sagas/saga';

const sagaMiddleware = createSagaMiddleware();

let appReducer = combineReducers({
    summoner : summonerReducer,
    lolStatus : lolStatusReducer,
    league : leagueReducer,
    mostPick : mostPickReducer
});

let store = createStore(appReducer,applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;