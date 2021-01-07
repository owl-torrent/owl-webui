import { combineReducers } from "redux";
import Torrents, * as fromTorrents from "./torrent"
import Bandwidth from "./bandwidth"
import Config from "./config"
import Client from "./client"
import Global from "./global"

export default combineReducers({ Torrents, Bandwidth, Config, Client, Global });

export const selectIsAnnouncingTorrents = (state) => {
    fromTorrents.selectIsAnnouncingTorrents(state);
}
