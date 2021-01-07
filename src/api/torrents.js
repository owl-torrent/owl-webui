import client from "./HTTPFactory";
import config from "react-global-configuration";

const routes = () => config.get("api").torrents

export const delete_torrent = async (params) => {
    const options = routes().delete
    return await client.get_instance()({ ...options, params })
};

export const add_torrent = (file) => {
    const options = routes().add
    const data = new FormData();
    data.append('torrent', file)
    return client.get_instance()({
        ...options, data, headers: {
            'content-type': 'multipart/form-data'
        }
    })
}