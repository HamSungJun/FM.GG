export const FETCH_MOST_PICK = "FETCH_MOST_PICK";
export const FETCH_MOST_PICK_FULFILLED = "FETCH_MOST_PICK_FULFILLED";
export const FETCH_MOST_PICK_REJECTED = "FETCH_MOST_PICK_REJECTED";

export const FETCH_INGAME_DATA_BY_CHAMPION_ID = "FETCH_INGAME_DATA_BY_CHAMPION_ID";
export const FETCH_INGAME_DATA_BY_CHAMPION_ID_FULFILLED = "FETCH_INGAME_DATA_BY_CHAMPION_ID_FULFILLED";
export const FETCH_INGAME_DATA_BY_CHAMPION_ID_REJECTED = "FETCH_INGAME_DATA_BY_CHAMPION_ID_REJECTED";

export const fetchMostPick = () => {
    return {
        type: FETCH_MOST_PICK
    }
}

export const fetchMostPickFulfilled = mostPickData => {
    return {
        type: FETCH_MOST_PICK_FULFILLED,
        mostPickData
    }
}

export const fetchMostPickRejected = error => {
    return {
        type: FETCH_MOST_PICK_REJECTED,
        error
    }
}

export const fetchInGameDataByChampionId = championId => {
    return {
        type: FETCH_INGAME_DATA_BY_CHAMPION_ID,
        championId
    }
}

export const fetchInGameDataByChampionIdFulfilled = inGameData => {
    return {
        type: FETCH_INGAME_DATA_BY_CHAMPION_ID,
        inGameData
    }
}

export const fetchInGameDataByChampionIdRejected = error => {
    return {
        type: FETCH_INGAME_DATA_BY_CHAMPION_ID,
        error
    }
}
