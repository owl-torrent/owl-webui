import { combineReducers } from "redux";
import torrents, * as fromTorrents from "./torrent";
import bandwidth from "./bandwidth";
import config from "./joalConfig";
import client from "./client";
import globals from "./globals";
import { JoalState } from "../../api/Types/joalState";

const reducers = combineReducers<JoalState>({
  torrents,
  bandwidth,
  config,
  client,
  globals,
});


export const selectIsAnnouncingTorrents = (state: JoalState) => {
  fromTorrents.selectIsAnnouncingTorrents(state);
};



export default reducers;