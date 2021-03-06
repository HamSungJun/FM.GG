import * as mostPickAction from '../actions/mostPickAction.js'

const mostPickInitialState = {
    mostPickInfo : [],
    matchLen : 100,
    analyzingKey : null,
    isFetching : false,
    error : null
}

const mostPickReducer = (state = mostPickInitialState, action) => {

    switch(action.type){

        case mostPickAction.FETCH_MOST_PICK:
            return Object.assign({},state,{
                mostPickInfo : [],
                isFetching : true,
                analyzingKey : null,
                error: null
            })
        
        case mostPickAction.FETCH_MOST_PICK_FULFILLED:
            return Object.assign({},state,{
                mostPickInfo : action.mostPickData,
                isFetching : false,
                error: null
            })
        
        case mostPickAction.FETCH_MOST_PICK_REJECTED:
            return Object.assign({},state,{
                mostPickInfo : [],
                isFetching : false,
                error : action.error
            })

        case mostPickAction.FETCH_INGAME_DATA:
            return Object.assign({},state,{
                mostPickInfo : state.mostPickInfo.map(pick => {
                    if(pick.key === action.championId){
                        pick.isAnalyzing = true
                    }
                    return pick;
                })
            })

        case mostPickAction.FETCH_INGAME_DATA_FULFILLED:
            return Object.assign({},state,{
                mostPickInfo : state.mostPickInfo.map(pick => {
                    if(pick.key === action.championId){
                        pick.isAnalyzing = false;
                        if(!pick.analyzedData){
                            pick.analyzedData = action.inGameData
                        } else if (Array.isArray(pick.analyzedData)) {
                            pick.analyzedData = pick.analyzedData.concat(action.inGameData);
                        }
                    }
                    return pick;
                })
            })
            
        case mostPickAction.FETCH_INGAME_DATA_REJECTED:
            return Object.assign({},state,{
                mostPickInfo : state.mostPickInfo.map(pick => {
                    if(pick.key === action.championId){
                        pick.isAnalyzing = false;
                    }
                    return pick;
                }),
                error : {
                    status : action.status,
                    statusText : action.statusText
                }
            })
        
        case mostPickAction.MOST_PICK_ITEM_SELECTED:
            return Object.assign({},state,{
                analyzingKey : action.key
            })
        
        case mostPickAction.MOST_PICK_ITEM_RELEASED:
            return Object.assign({},state,{
                analyzingKey : null
            })
        default :
            return state

    }

}

export default mostPickReducer;