export const TYPE_SUMMONER = "TYPE_SUMMONER";
export const FETCH_SUMMONER = "FETCH_SUMMONER";
export const FETCH_SUMMONER_FULFILLED = "FETCH_SUMMONER_FULFILLED";
export const FETCH_SUMMONER_REJECTED = "FETCH_SUMMONER_REJECTED";

export const typeSummoner = summonerName => ({
    type: TYPE_SUMMONER,
    summonerName
})

export const fetchSummoner = summonerName => ({
    type: FETCH_SUMMONER,
    summonerName
});

export const fetchSummonerFulfilled = summoner => ({
    type: FETCH_SUMMONER_FULFILLED,
    payload : summoner
});

export const fetchSummonerRejected = () => ({
    type: FETCH_SUMMONER_REJECTED,
});
