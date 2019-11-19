import * as chartAction from '../actions/chartAction.js';

const chartInitialState = {
    durationSelected : "Duration",
    laneSelected : "Lane",
    radioSelected : "Stat",
    gameKeySelected : null
};

const chartReducer = (state = chartInitialState, action) => {
    switch(action.type){

        case chartAction.DURATION_VALUE_CHANGE :
            return Object.assign({},state,{
                durationSelected : action.duration
            })

        case chartAction.LANE_VALUE_CHANGE :
            return Object.assign({},state,{
                laneSelected : action.lane
            })
        
        case chartAction.RADIO_VALUE_CHANGE :
            return Object.assign({},state,{
                radioSelected : action.radioValue
            })

        case chartAction.SELECTED_GAME_KEY_CHANGE :
            return Object.assign({},state,{
                gameKeySelected : action.gameKey
            })
        
        case chartAction.SELECTED_PICK_CHANGE :
            return chartInitialState;
        
        
            
        default:
            return state;
    }
};

export default chartReducer;