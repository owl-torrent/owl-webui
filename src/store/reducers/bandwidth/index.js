import types from "../../actions/types";

const reducer = (state = {}, action) => {
    debugger
    switch (action.type) {
        
        case types.INIT_STATE:
            return action.payload.bandwidth
        default:
            return state;
    }
}

export default reducer;