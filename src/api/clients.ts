import HTTPFactory from "./HTTPFactory";
import config from "../configuration";

export const get_all = async () => {
  const apicall = config().api.clients.get;
  return await HTTPFactory.request(apicall);
};
