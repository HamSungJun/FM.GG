import * as summonerAction from '../actions/summonerAction.js'

const summonerInitialState = {
    summonerName : "",
    results : {}
}

const appReducer = (state = appInitialState, action) => {

    switch(action.type){

        case summonerAction.summonerSearch :
            return Object.assign({},state,{
                summonerName : action.summonerName
            });

        default:
            return state;

    }

}

export default appReducer;