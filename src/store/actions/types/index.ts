import torrent from "../torrent/actionTypes";
import state from "../state/actionTypes";
import { InitStateAction } from "../state";

const actionTypes = {
  ...torrent,
  ...state,
};

export type Actions = InitStateAction;

export default actionTypes;
