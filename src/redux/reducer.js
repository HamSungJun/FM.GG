import * as actions from './action.js'

const appInitialState = {
    hello : "world"
}

const appReducer = (state = appInitialState, action) => {

    switch(action.type){

        case actions.basicAction :
            return Object.assign({},state,{
                hello : "new world"
            });

        default:
            return state;

    }

}

export default appReducer;