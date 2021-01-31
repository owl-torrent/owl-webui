import types from "../actions/types";
import { Actions } from "../actions/types";
import { Client } from "../../api/Types/joalState";

const initialState = {
  name: "qBittorrent",
  version: "4.1.0",
};

const reducer = (state: Client = initialState, action: Actions) => {
  switch (action.type) {
    case types.INIT_STATE:
      return action.payload.client;
    default:
      return state;
  }
};

export default reducer;
