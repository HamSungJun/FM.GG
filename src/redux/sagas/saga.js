
import {put, takeEvery, all, select, call} from 'redux-saga/effects';
import {SERVER_URL} from '../globals/global';
import * as summonerAction from '../actions/summonerAction'
import axios from 'axios';

export function fetchSummonerApi(summonerName) {
    
    return axios.get(`${SERVER_URL}/api/summoner/summonerInfo?name=${summonerName}`)
    .then(response => ({response}))
    .catch(error => ({error}))

}

export function* fetchSummoner() {

    const storeState = yield select();
    const {response, error} = yield call(fetchSummonerApi, storeState.summoner.summonerName);
    if(response){
        yield put(summonerAction.fetchSummonerFulfilled(response.data))
    } else {
        yield put(summonerAction.fetchSummonerRejected(error.response.status))
    }
}

export function* watchFetchSummoner() {
    yield takeEvery('FETCH_SUMMONER',fetchSummoner);
}

export default function* rootSaga() {
    yield all([
        watchFetchSummoner()
    ])
}