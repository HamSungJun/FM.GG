
export const FETCH_LEAGUE = "FETCH_LEAGUE";
export const FETCH_LEAGUE_FULFILLED = "FETCH_LEAGUE_FULFILLED";
export const FETCH_LEAGUE_REJECTED = "FETCH_LEAGUE_REJECTED";

export const fetchLeague = () => ({
    type: FETCH_LEAGUE
});

export const fetchLeagueFulfilled = league => ({
    type: FETCH_LEAGUE_FULFILLED,
    payload: league
});

export const fetchLeagueRejected = errorCode => ({
    type: FETCH_LEAGUE_REJECTED,
    errorCode
});
