import * as summonerAction from '../actions/summonerAction.js'

const summonerInitialState = {
    summonerName : "",
    summonerInfo : {},
    isFetching : false,
    errorCode : undefined
}

const summonerReducer = (state = summonerInitialState, action) => {

    switch(action.type){
        case summonerAction.TYPE_SUMMONER :
            return Object.assign({},state,{
                summonerName : action.summonerName
            })

        case summonerAction.FETCH_SUMMONER :
            return Object.assign({},state,{
                isFetching : true
            })

        case summonerAction.FETCH_SUMMONER_FULFILLED :
            return Object.assign({},state,{
                summonerName : "",
                summonerInfo : action.payload,
                isFetching : false
            });
        
        case summonerAction.FETCH_SUMMONER_REJECTED :
            return Object.assign({},state,{
                errorCode : action.errorCode,
                isFetching: false
            });

        default:
            return state;

    }

}

export default summonerReducer;