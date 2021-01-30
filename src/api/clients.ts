import HTTPFactory from "./HTTPFactory";
import config from "react-global-configuration";
import { ClientsApi } from "./Types/uiConfig";
const api = (): ClientsApi => config.get("api").clients;

export const get_all = async () => {
  return await HTTPFactory.request(api().get);
};
