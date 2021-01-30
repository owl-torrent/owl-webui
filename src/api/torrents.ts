import HTTPFactory from "./HTTPFactory";
import config from "../configuration";

export const delete_torrent = async (params: {
  [infohash: string]: string;
}) => {
  const apicall = config.api.torrents.delete;
  return await HTTPFactory.request({ ...apicall, params });
};

export const add_torrent = (file: Blob) => {
  const apicall = config.api.torrents.add;
  const data = new FormData();
  data.append("torrent", file);
  return HTTPFactory.request({
    ...apicall,
    data,
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
