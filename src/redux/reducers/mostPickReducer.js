import * as mostPickAction from '../actions/mostPickAction.js'

const mostPickInitialState = {
    mostPick : [],
    matchLen : 100,
    isFetching : false,
    error : null
}

const mostPickReducer = (state = mostPickInitialState, action) => {

    switch(action.type){

        case mostPickAction.FETCH_MOST_PICK:
            return Object.assign({},state,{
                mostPick : [],
                isFetching : true,
                error: null
            })
        
        case mostPickAction.FETCH_MOST_PICK_FULFILLED:
            return Object.assign({},state,{
                mostPick : action.mostPickData,
                isFetching : false,
                error: null
            })
        
        case mostPickAction.FETCH_MOST_PICK_FULFILLED:
            return Object.assign({},state,{
                mostPick : [],
                isFetching : false,
                error : action.error
            })

        case mostPickAction.FETCH_INGAME_DATA_BY_CHAMPION_ID:
            return Object.assign({},state,{
                mostPick : state.mostPick.map(pick => {
                    if(pick.key === action.championId){
                        pick.isAnalyzing = true
                    }
                    return pick;
                })
            })

        default :
            return state

    }

}

export default mostPickReducer;