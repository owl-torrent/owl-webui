import types from "../actions/types";
import { Actions } from "../actions/types";
import { JoalConfig } from "../../api/Types/joalState";

const initialState = {
  needRestartToTakeEffect: false,
  runtimeConfig: {
    minimumBytesPerSeconds: 50,
    maximumBytesPerSeconds: 250,
    client: "qBittorrent-4.1.0",
  },
};
const reducer = (
  state: JoalConfig = initialState,
  action: Actions
): JoalConfig => {
  switch (action.type) {
    case types.INIT_STATE:
      return action.payload.config;
    default:
      return state;
  }
};

export default reducer;
