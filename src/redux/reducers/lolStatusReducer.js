import * as lolStatusAction from '../actions/lolStatusAction.js'

const lolStatusInitialState = {
    lolStatus : [],
    isFetching : false,
    errorCode : undefined
}

const lolStatusReducer = (state = lolStatusInitialState, action) => {

    switch(action.type){
      
        case lolStatusAction.FETCH_LOL_STATUS :
            return Object.assign({},state,{
                isFetching : true,
                lolStatus: []
            })

        case lolStatusAction.FETCH_LOL_STATUS_FULFILLED :
            return Object.assign({},state,{
                isFetching : false,
                lolStatus : action.payload
            });
        
        case lolStatusAction.FETCH_LOL_STATUS_REJECTED :
            return Object.assign({},state,{
                errorCode : action.errorCode,
                isFetching : false
            });

        default:
            return state;

    }

}

export default lolStatusReducer;