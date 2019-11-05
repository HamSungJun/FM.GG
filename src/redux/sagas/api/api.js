import axios from 'axios';
import {SERVER_URL} from '../../globals/global';

export function fetchSummonerApi(summonerName) {
    return axios.get(`${SERVER_URL}/api/summoner/summonerInfo?name=${summonerName}`)
    .then(summoner => ({summoner}))
    .catch(error => ({error}))
}

export function fetchLolStatusApi() {
    return axios.get(`${SERVER_URL}/api/lolStatus`)
    .then(status => ({status}))
    .catch(error => ({error}))
}

export function fetchLeagueApi(encryptedSummonerId) {
    return axios.get(`${SERVER_URL}/api/league?encryptedSummonerId=${encryptedSummonerId}`)
    .then(league => ({league}))
    .catch(error => ({error}))
}