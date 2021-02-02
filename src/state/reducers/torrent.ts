import types from "../actions/types";
import { Actions } from "../actions/types";
import { Torrent, JoalState } from "../../api/Types/joalState";

const reducer = (
  state: { [hashKey: string]: Torrent } = {},
  action: Actions
) => {
  switch (action.type) {
    case types.INIT_STATE:
      return action.payload.torrents;
    default:
      return state;
  }
};

export const selectIsAnnouncingTorrents = (state: JoalState) => {
  const { torrents } = state;
  const announcingTorrents: string[] = [];
  if (Object.keys(torrents).length > 0) {
    Object.keys(torrents).forEach((infoHash) => {
      torrents[infoHash].isAnnouncing && announcingTorrents.push(infoHash);
    });
  }
  return announcingTorrents;
};

export default reducer;
