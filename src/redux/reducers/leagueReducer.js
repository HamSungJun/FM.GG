import * as leagueAction from '../actions/leagueAction.js'

const leagueInitialState = {
    leagueData : [],
    selectedQueueType : "",
    isFetching : false,
    errorCode : undefined
}

const leagueReducer = (state = leagueInitialState, action) => {

    switch(action.type){
      
        case leagueAction.FETCH_LEAGUE :
            return Object.assign({},leagueInitialState,{
                isFetching : true
            });

        case leagueAction.FETCH_LEAGUE_FULFILLED :
            return Object.assign({},state,{
                isFetching : false,
                leagueData : action.league,
                selectedQueueType : setQueueType(action.league)
            });
        
        case leagueAction.FETCH_LEAGUE_REJECTED :
            return Object.assign({},state,{
                isFetching : false,
                errorCode : action.errorCode
            });
        
        case leagueAction.QUEUE_TYPE_CHANGE :
            return Object.assign({},state,{
                selectedQueueType : action.queueType
            })

        default:
            return state;

    }

}
 
const setQueueType = league => {
    if(league.length > 0){
        const soloQueueIndex = league.findIndex(item => item.queueType === "RANKED_SOLO_5x5");
        if(soloQueueIndex !== -1){
            return league[soloQueueIndex].queueType;
        } else {
            return league[0].queueType;
        }
    } else {
        return null;
    }
} 

export default leagueReducer;