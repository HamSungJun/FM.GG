
import {put, takeEvery, all, select, call, delay} from 'redux-saga/effects';
import {SERVER_URL} from '../globals/global';

import * as summonerAction from '../actions/summonerAction';
import * as lolStatusAction from '../actions/lolStatusAction';
import * as leagueAction from '../actions/leagueAction';

import axios from 'axios';
import history from '../../history/history.js';

export function fetchSummonerApi(summonerName) {
    return axios.get(`${SERVER_URL}/api/summoner/summonerInfo?name=${summonerName}`)
    .then(response => ({response}))
    .catch(error => ({error}))
}

export function* fetchSummoner() {
    const storeState = yield select();
    const {response, error} = yield call(fetchSummonerApi, storeState.summoner.summonerName);
    if(response){
        yield put(summonerAction.fetchSummonerFulfilled(response.data));
        yield call(history.push, `/summonerInfo?name=${storeState.summoner.summonerName}`);
    } else {
        yield put(summonerAction.fetchSummonerRejected(error.response.status));
    }
}

export function* watchFetchSummoner() {
    yield takeEvery(summonerAction.FETCH_SUMMONER,fetchSummoner);
}

export function fetchLolStatusApi() {
    return axios.get(`${SERVER_URL}/api/lolStatus`)
    .then(status => ({status}))
    .catch(error => ({error}))
}

export function* fetchLolStatus() {
    const {status, error} = yield call(fetchLolStatusApi);
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

export function fetchLeagueApi() {
    return axios.get(`${SERVER_URL}/api/league`)
    .then(league => ({league}))
    .catch(error => ({error}))
}

export function* fetchLeague() {
    const {league, error} = yield call(fetchLeagueApi);
    if(league){
        console.log(league)
        yield delay(2000);
        yield put(leagueAction.fetchLeagueFulfilled(league.data));
    } else {
        yield put(leagueAction.fetchLeagueRejected(error.response.status));
    }
}

export function* watchFetchLeague() {
    yield takeEvery(leagueAction.FETCH_LEAGUE,fetchLeague);
}


export default function* rootSaga() {
    yield all([
        watchFetchSummoner(),
        watchFetchLolStatus()
    ])
}