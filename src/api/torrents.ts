import HTTPFactory from "./HTTPFactory";
import config from "react-global-configuration";
import { TorrentsApi } from "./Types/uiConfig";

const api = (): TorrentsApi => config.get("api").torrents;

export const delete_torrent = async (params: {
  [infohash: string]: string;
}) => {
  const options = api().delete;
  return await HTTPFactory.request({ ...options, params });
};

export const add_torrent = (file: Blob) => {
  const options = api().add;
  const data = new FormData();
  data.append("torrent", file);
  return HTTPFactory.request({
    ...options,
    data,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
