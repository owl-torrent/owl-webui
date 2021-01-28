import config from "react-global-configuration";
import { get_env } from "./env";
import { ConfigObject } from "./type";
import { Fetcher } from "../utils/async";

export const fetchConfig = async () => {
  const [endpoint, mockPath] = get_env();
  if (!endpoint && !mockPath) {
    return false;
  }
  const url = endpoint && endpoint.length > 0 ? endpoint : mockPath;
  const fetcher = new Fetcher<ConfigObject>(url);
  const { data } = await fetcher.fetchIt();

  console.log("this is the initial joal configuration :", data);
  if (data) {
    try {
      config.set(data);
      return true;
    } catch (error) {
      console.error(`Error during setting react global configuration ${error}`);
      return false;
    }
  }
  return false;
};
