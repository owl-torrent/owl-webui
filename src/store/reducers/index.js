import { combineReducers } from "redux";
import Torrents, * as fromTorrents from "./torrent"
import Bandwidth from "./bandwidth"

export default combineReducers({ Torrents, Bandwidth });

export const selectIsAnnouncingTorrents = (state) => {
    fromTorrents.selectIsAnnouncingTorrents(state);
}
