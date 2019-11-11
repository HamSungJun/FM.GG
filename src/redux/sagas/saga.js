
import {put, takeEvery, all, select, call, delay} from 'redux-saga/effects';


import * as summonerAction from '../actions/summonerAction';
import * as lolStatusAction from '../actions/lolStatusAction';
import * as leagueAction from '../actions/leagueAction';

import * as apiCall from './api/api';
import history from '../../history/history.js';

export function* fetchSummoner() {
    const storeState = yield select();
    const urlParams = new URLSearchParams(window.location.search);

    yield put(leagueAction.fetchLeague());

    const {summoner} = yield call(apiCall.fetchSummonerApi, storeState.summoner.summonerName || urlParams.get("name"));
    
    if(summoner.status === 200){
        yield put(summonerAction.fetchSummonerFulfilled(summoner.data));
    }

    const {league} = yield call(apiCall.fetchLeagueApi, summoner.data.id);

    if(league.status === 200){
        yield put(leagueAction.fetchLeagueFulfilled(league.data));
    }

    yield call(history.push, `/summonerInfo?name=${storeState.summoner.summonerName || urlParams.get("name")}`);
}

export function* watchFetchSummoner() {
    yield takeEvery(summonerAction.FETCH_SUMMONER,fetchSummoner);
}

export function* fetchLolStatus() {
    const {status, error} = yield call(apiCall.fetchLolStatusApi);
    if(status){
        console.log(status)
        yield delay(2000);
        yield put(lolStatusAction.fetchLolStatusFulfilled(status.data));
    } else {
        yield put(lolStatusAction.fetchLolStatusRejected(error.response.status));
    }
}

export function* watchFetchLolStatus() {
    yield takeEvery(lolStatusAction.FETCH_LOL_STATUS,fetchLolStatus);
}

export default function* rootSaga() {
    yield all([
        watchFetchSummoner(),
        watchFetchLolStatus()
    ])
}