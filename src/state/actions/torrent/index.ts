import { Dispatch } from "redux";

export const start = () => async (dispatch: Dispatch) => {
  dispatch({
    type: "IMPLEMENT_ME",
    payload: {},
  });
};
