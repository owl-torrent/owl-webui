import HTTPFactory from "./HTTPFactory";
import config from "react-global-configuration";
import { ConfigObject } from "./type";

const routes = (): ConfigObject => config.get("api").state;

export const get_initial_state = async () => {
  const options = routes().api.state.get;
  return await HTTPFactory.client(options);
};
