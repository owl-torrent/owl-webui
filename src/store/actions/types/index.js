import torrent from "../torrent/actionTypes"
import state from "../state/actionTypes"

const actionTypes = {
    ...torrent,
    ...state
}

export default actionTypes