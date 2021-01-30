import HTTPFactory from "./HTTPFactory";
import config from "react-global-configuration";
import { ConfigurationApi } from "./Types/uiConfig";

const api = (): ConfigurationApi => config.get("api").configuration;

export const get_configuration = async () => {
  return await HTTPFactory.request(api().get);
};

export const change_configuration = async (data: Object) => {
  return await HTTPFactory.request({ ...api().change, data });
};
