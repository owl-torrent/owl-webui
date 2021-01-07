import { combineReducers } from "redux";
import Torrents, * as fromTorrents from "./torrent"

export default combineReducers({ Torrents });

export const selectIsAnnouncingTorrents = (state) => {
    fromTorrents.selectIsAnnouncingTorrents(state);
}
