export const FETCH_MOST_PICK = "FETCH_MOST_PICK";
export const FETCH_MOST_PICK_FULFILLED = "FETCH_MOST_PICK_FULFILLED";
export const FETCH_MOST_PICK_REJECTED = "FETCH_MOST_PICK_REJECTED";

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
