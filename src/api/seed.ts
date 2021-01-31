import HTTPFactory from "./HTTPFactory";
import config from "../configuration";

export const start_seed = async () => {
  const apicall = config().api.seed.start;
  //TODO : Handle error
  await HTTPFactory.request(apicall);
};

export const stop_seed = async () => {
  const apicall = config().api.seed.stop;
  //TODO : Handle error
  await HTTPFactory.request(apicall);
};
