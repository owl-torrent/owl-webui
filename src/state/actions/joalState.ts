import types from "./types/joalState";
import API from "../../api";
import { Dispatch } from "redux";
import {InitStateAction} from "./types"


export const getInitialState = () => async (dispatch: Dispatch) => {
  const { data } = await API.state.get();
  dispatch<InitStateAction>({
    type: types.INIT_STATE,
    payload: { ...data },
  });
};
