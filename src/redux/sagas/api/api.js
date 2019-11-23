import axios from 'axios';
import {SERVER_URL} from '../../globals/global';

export function fetchSummonerApi(summonerName) {
    return axios.get(`${SERVER_URL}/api/summoner/summonerInfo?name=${summonerName}`)
    .then(summoner => (summoner))
    .catch(error => (error.response))
}

export function fetchLolStatusApi() {
    return axios.get(`${SERVER_URL}/api/lolStatus`)
    .then(status => (status))
    .catch(error => (error.response))
}

export function fetchLeagueApi(encryptedSummonerId) {
    return axios.get(`${SERVER_URL}/api/league?encryptedSummonerId=${encryptedSummonerId}`)
    .then(league => (league))
    .catch(error => (error.response))
}

export function fetchMostPickApi(encryptedAccountId) {
    return axios.get(`${SERVER_URL}/api/match/getRecentSoloRankMostPick?encryptedAccountId=${encryptedAccountId}`)
    .then(mostPick => {return mostPick})
    .catch(error => (error))
}

export function fetchInGameDataApi(championId, matchId) {

    return axios({ method: 'POST', url: `${SERVER_URL}/api/match/getMostPickInGameData`, headers: {"Content-Type": "application/json"}, data: { matchId } })
    .then(inGameData => ({
        payload : inGameData,
        championId
    }))
    .catch(error => (error))
    
}