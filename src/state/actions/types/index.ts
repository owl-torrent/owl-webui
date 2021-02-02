import torrent from "./torrent";
import state from "./joalState";
import { JoalState } from "../../../api/Types/joalState";

const actionTypes = {
  ...torrent,
  ...state,
};

export interface InitStateAction {
  type: state.INIT_STATE;
  payload: JoalState;
}

export type Actions = InitStateAction;

export default actionTypes;
