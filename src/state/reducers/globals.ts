import types from "../actions/types";
import config from "../../configuration";
import { filterObjectByKeys } from "../../utils/objects";
import { Actions } from "../actions/types";

const reducer = (
  state: { [started: string]: any } = { started: false },
  action: Actions
) => {
  switch (action.type) {
    case types.INIT_STATE:
      const globalState = filterObjectByKeys(
        action.payload,
        config().globalStateKeys
      );
      return globalState;
    default:
      return state;
  }
};

export default reducer;
