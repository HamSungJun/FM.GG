export const DURATION_VALUE_CHANGE = "DURATION_VALUE_CHANGE";
export const LANE_VALUE_CHANGE = "LANE_VALUE_CHANGE";
export const RADIO_VALUE_CHANGE = "RADIO_VALUE_CHANGE";
export const SELECTED_PICK_CHANGE = "SELECTED_PICK_CHANGE";
export const SELECTED_GAME_KEY_CHANGE = "SELECTED_GAME_KEY_CHANGE";
export const RESET_CHART_REDUCER = "RESET_CHART_REDUCER";

export const durationValueChange = duration => ({
    type : DURATION_VALUE_CHANGE,
    duration
})

export const laneValueChange = lane => ({
    type : LANE_VALUE_CHANGE,
    lane
})

export const radioValueChange = radioValue => ({
    type : RADIO_VALUE_CHANGE,
    radioValue
})

export const selectedPickChange = () => ({
    type : SELECTED_PICK_CHANGE
})

export const selectedGameKeyChange = gameKey => ({
    type : SELECTED_GAME_KEY_CHANGE,
    gameKey
})

export const resetChartReducer = () => ({
    type : RESET_CHART_REDUCER
})