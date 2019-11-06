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
            return Object.assign({},state,{
                isFetching : true,
                leagueData: []
            })

        case leagueAction.FETCH_LEAGUE_FULFILLED :
            return Object.assign({},state,{
                isFetching : false,
                leagueData : action.league,
                selectedQueueType : action.league.length > 0 ? action.league[0].queueType : "",
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

export default leagueReducer;