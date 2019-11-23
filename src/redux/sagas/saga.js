import {put, takeEvery, takeLatest, all, select, call, delay} from 'redux-saga/effects';

import * as summonerAction from '../actions/summonerAction';
import * as lolStatusAction from '../actions/lolStatusAction';
import * as leagueAction from '../actions/leagueAction';
import * as mostPickAction from '../actions/mostPickAction';

import * as apiCall from './api/api';
import history from '../../history/history.js';

export function* fetchSummoner(action) {
    
    yield put(leagueAction.fetchLeague());
    yield put(mostPickAction.fetchMostPick());

    const summonerResponse = yield call(apiCall.fetchSummonerApi, action.summonerName);

    if(summonerResponse && summonerResponse.status === 200){
        yield put(summonerAction.fetchSummonerFulfilled(summonerResponse.data));
    } else {
        alert(summonerResponse.data.mesg);
        yield put(summonerAction.fetchSummonerRejected());
        return yield call(history.push,`/`)
    }

    const [league,mostPick] = yield all([
        apiCall.fetchLeagueApi(summonerResponse.data.id),
        apiCall.fetchMostPickApi(summonerResponse.data.accountId)
        ]);

    if(league.status === 200){
        yield put(leagueAction.fetchLeagueFulfilled(league.data));
    }

    if(mostPick.status === 200){
        yield put(mostPickAction.fetchMostPickFulfilled(mostPick.data));
    }
    
}



export function* fetchLolStatus() {
    const statusResponse = yield call(apiCall.fetchLolStatusApi);
    console.log(statusResponse)
    if(statusResponse && statusResponse.status === 200){
        yield put(lolStatusAction.fetchLolStatusFulfilled(statusResponse.data));
    } else {
        yield put(lolStatusAction.fetchLolStatusRejected(statusResponse.status));
    }
}

export function* fetchInGameData(action) {
    const storeState = yield select();
    const targetPick = storeState.mostPick.mostPickInfo.find(pickInfo => pickInfo.key === action.championId);
    let response;

    if(!Array.isArray(targetPick.analyzedData)){
        response = yield call(apiCall.fetchInGameDataApi, action.championId, targetPick.matchList.matches.slice(0,20).map(match => match.gameId));
    } else if(targetPick.analyzedData.length < targetPick.matchList.matches.length){
        response = yield call(apiCall.fetchInGameDataApi, action.championId, targetPick.matchList.matches.slice(targetPick.analyzedData.length,targetPick.analyzedData.length + 20).map(match => match.gameId));
    } else {
        response = {
            championId : action.championId,
            payload : {
                status : 200,
                data : []
            }
        };
    }
    
    if(response.payload.status === 200){
        yield put(mostPickAction.fetchInGameDataFulfilled(response.payload.data,response.championId));
    } else {
        yield put(mostPickAction.fetchInGameDataRejected(response.status, response.statusText));
    }

}

export function* watchFetchSummoner() {
    yield takeEvery(summonerAction.FETCH_SUMMONER,fetchSummoner);
}

export function* watchFetchLolStatus() {
    yield takeEvery(lolStatusAction.FETCH_LOL_STATUS,fetchLolStatus);
}

export function* watchFetchInGameDataByChampionId() {
    yield takeEvery(mostPickAction.FETCH_INGAME_DATA, fetchInGameData);
}

export default function* rootSaga() {
    yield all([
        watchFetchSummoner(),
        watchFetchLolStatus(),
        watchFetchInGameDataByChampionId()
    ])
}