import axios from "axios";
import { handleAsync } from "../utils/errors";
import config from "react-global-configuration";
import { get_env } from "./env";

class configFetcher {
  constructor(endpoint, mockPath, name) {
    this.endpoint = endpoint;
    this.mockPath = mockPath;
    this.name = name;
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
        `Error during initial ${this.name} this might be because you did not define the environment variable for that configuration object`
      );
      return false;
    }
    const [err, it] = await handleAsync(this.fetchIt());
    if (err) {
      console.error(`Error during initial ${this.name} ${err}`);
      return false;
    }
    return { [this.name]: it.data };
  };
}

export const fetchConfig = async () => {
  let fetchers = [];
  const env = await get_env();
  if (!env.length) {
    return false;
  }

  env.forEach(([endpoint, mockPath, name]) => {
    const fetcher = new configFetcher(endpoint, mockPath, name);
    fetchers.push(fetcher.getIt());
  });

  const fetched = await Promise.all(fetchers).then((fetchedConfigs) => {
    let conf = {};
    fetchedConfigs.forEach((fetchedConfig) => {
      conf = { ...conf, ...fetchedConfig };
    });
    console.log("This is the initial configuration for Joal WebUi :", conf);
    try {
      config.set(conf, { freeze: false });
      return true;
    } catch (error) {
      return false;
    }
  });
  return fetched;
};
