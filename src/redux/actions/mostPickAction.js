export const FETCH_MOST_PICK = "FETCH_MOST_PICK";
export const FETCH_MOST_PICK_FULFILLED = "FETCH_MOST_PICK_FULFILLED";
export const FETCH_MOST_PICK_REJECTED = "FETCH_MOST_PICK_REJECTED";

export const FETCH_INGAME_DATA = "FETCH_INGAME_DATA";
export const FETCH_INGAME_DATA_FULFILLED = "FETCH_INGAME_DATA_FULFILLED";
export const FETCH_INGAME_DATA_REJECTED = "FETCH_INGAME_DATA_REJECTED";

export const MOST_PICK_ITEM_SELECTED = "MOST_PICK_ITEM_SELECTED";

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

export const fetchInGameData = (championId) => {
    return {
        type: FETCH_INGAME_DATA,
        championId
    }
}

export const fetchInGameDataFulfilled = (inGameData, championId) => {
    return {
        type: FETCH_INGAME_DATA_FULFILLED,
        inGameData,
        championId
    }
}

export const fetchInGameDataRejected = (status,statusText) => {
    return {
        type: FETCH_INGAME_DATA_REJECTED,
        status,
        statusText
    }
}

export const mostPickItemSelected = key => {
    return {
        type: MOST_PICK_ITEM_SELECTED,
        key
    }
}