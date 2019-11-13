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
    .then(league => {return league})
    .catch(error => (error))
}

export function fetchMostPickApi(encryptedAccountId) {
    return axios.get(`${SERVER_URL}/api/match/getRecentSoloRankMostPick?encryptedAccountId=${encryptedAccountId}`)
    .then(mostPick => {return mostPick})
    .catch(error => (error))
}

export function fetchInGameDataApi(championId, matchId) {
    return axios.post(`${SERVER_URL}/api/match/getMostPickInGameData`,{
        matchId
    })
    .then(inGameData => ({
        payload : inGameData,
        championId
    }))
    .catch(error => (error))
}