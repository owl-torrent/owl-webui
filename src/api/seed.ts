import HTTPFactory from "./HTTPFactory";
import config from "react-global-configuration";
import { SeedApi } from "./Types/uiConfig";

const api = (): SeedApi => config.get("api").seed;

export const start_seed = async () => {
  const options = api().start;
  //TODO : Handle error
  await HTTPFactory.request(options);
};

export const stop_seed = async () => {
  const options = api().stop;
  //TODO : Handle error
  await HTTPFactory.request(options);
};
