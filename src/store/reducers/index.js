import { combineReducers } from "redux";
import Torrents, * as fromTorrents from "./torrent"
import Bandwidth from "./bandwidth"
import Config from "./config"

export default combineReducers({ Torrents, Bandwidth, Config });

export const selectIsAnnouncingTorrents = (state) => {
    fromTorrents.selectIsAnnouncingTorrents(state);
}
