import types from "../actions/types";
import { Actions } from "../actions/types";
import { Bandwidth } from "../../api/Types/joalState";

const initialState = {
  currentBandwidth: 200,
  torrents: {},
};

const reducer = (state: Bandwidth = initialState, action: Actions) => {
  switch (action.type) {
    case types.INIT_STATE:
      return action.payload.bandwidth;
    default:
      return state;
  }
};

export default reducer;
