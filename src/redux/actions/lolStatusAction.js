
export const FETCH_LOL_STATUS = "FETCH_LOL_STATUS";
export const FETCH_LOL_STATUS_FULFILLED = "FETCH_LOL_STATUS_FULFILLED";
export const FETCH_LOL_STATUS_REJECTED = "FETCH_LOL_STATUS_REJECTED";

export const fetchLolStatus = () => ({
    type: FETCH_LOL_STATUS
});

export const fetchLolStatusFulfilled = status => ({
    type: FETCH_LOL_STATUS_FULFILLED,
    payload: status
});

export const fetchLolStatusRejected = errorCode => ({
    type: FETCH_LOL_STATUS_REJECTED,
    errorCode
});
