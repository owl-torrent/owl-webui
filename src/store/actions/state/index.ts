import types from "./actionTypes";
import API from "../../../api";
import { Dispatch } from "redux";

export const getInitialState = () => async (dispatch: Dispatch) => {
  const { data } = await API.state.get();
  dispatch({
    type: types.INIT_STATE,
    payload: { ...data },
  });
};
