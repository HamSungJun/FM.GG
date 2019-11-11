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

        default :
            return state

    }

}

export default mostPickReducer;