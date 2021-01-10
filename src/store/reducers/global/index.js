import types from "../../actions/types";
import config from "react-global-configuration"
import { filterObjectByKeys } from "../../../utils/objects"
const reducer = (state = {}, action) => {
    switch (action.type) {
        case types.INIT_STATE:
            const globalKeys = config.get("globalStateKeys")
            const globalState = filterObjectByKeys(action.payload, globalKeys)
            return globalState
        default:
            return state;
    }
}

export default reducer;