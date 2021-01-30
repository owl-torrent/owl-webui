import types from "./actionTypes";
import API from "../../../api";
import { Dispatch } from "redux";
import { JoalState } from "../../../api/Types/joalState";

export interface InitStateAction {
  type: types.INIT_STATE;
  payload: JoalState;
}

export const getInitialState = () => async (dispatch: Dispatch) => {
  const { data } = await API.state.get();
  dispatch<InitStateAction>({
    type: types.INIT_STATE,
    payload: { ...data },
  });
};
