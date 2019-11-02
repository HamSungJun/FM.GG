import * as leagueAction from '../actions/leagueAction.js'

const leagueInitialState = {
    leagueData : [],
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
                leagueData : action.payload
            });
        
        case leagueAction.FETCH_LEAGUE_REJECTED :
            return Object.assign({},state,{
                isFetching : false,
                errorCode : action.errorCode
            });

        default:
            return state;

    }

}

export default leagueReducer;