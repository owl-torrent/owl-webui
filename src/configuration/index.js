import axios from "axios";
import { handleAsync } from "../utils/errors";
import config from "react-global-configuration";
import { get_env } from "./env";

class configFetcher {
  constructor(endpoint, mockPath) {
    this.endpoint = endpoint;
    this.mockPath = mockPath;
  }

  fetchIt = () => {
    const { endpoint, mockPath } = this;
    const url = endpoint || mockPath;
    return url ? axios.get(url) : null;
  };

  getIt = async () => {
    const promise = this.fetchIt();
    if (!promise) {
      console.error(
        `Error during initial configuration this might be because you did not define the environment variable for that configuration object`
      );
      return false;
    }
    const [err, it] = await handleAsync(this.fetchIt());
    if (err) {
      console.error(`Error during initial configuration ${err}`);
      return false;
    }
    return it.data;
  };
}

export const fetchConfig = async () => {
  const [endpoint, mockPath] = await get_env();
  if (!endpoint && !mockPath) {
    return false;
  }
  const fetcher = new configFetcher(endpoint, mockPath);
  const conf = await fetcher.getIt();
  console.log("this is the initial joal configuration :", conf);
  if (conf) {
    try {
      config.set(conf, { freeze: false });
      return true;
    } catch (error) {
      console.error(`Error during setting react global configuration ${error}`);
      return false;
    }
  }
  return false

};
