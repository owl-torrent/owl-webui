import types from "../../actions/types";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case types.INIT_STATE:
            return action.payload.torrents
        default:
            return state;
    }
}

export const selectIsAnnouncingTorrents = (state) => {
    const { Torrents } = state
    const announcingTorrents = []
    if (Object.keys(Torrents).length > 0) {
        Object.keys(Torrents).forEach(infoHash => {
            Torrents[infoHash].isAnnouncing && announcingTorrents.push(infoHash)
        })
    }
    return announcingTorrents
}

export default reducer;