import types from "../../actions/types";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case types.INIT_STATE:
            return action.payload.config
        default:
            return state;
    }
}

export default reducer;