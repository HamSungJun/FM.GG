export const DURATION_VALUE_CHANGE = "DURATION_VALUE_CHANGE";
export const LANE_VALUE_CHANGE = "LANE_VALUE_CHANGE";
export const RADIO_VALUE_CHANGE = "RADIO_VALUE_CHANGE";

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