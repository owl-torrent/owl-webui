import HTTPFactory from "./HTTPFactory";
import config from "../configuration";
import { JoalState } from "./Types/joalState";

export const get_initial_state = async () => {
  const apicall = config.api.state.get;
  return await HTTPFactory.request<JoalState>(apicall);
};
