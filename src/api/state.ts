import HTTPFactory from "./HTTPFactory";
import config from "react-global-configuration";
import { StateApi } from "./Types/uiConfig";
import { JoalState } from "./Types/joalState";
const api = (): StateApi => config.get("api").state;

export const get_initial_state = async () => {
  const options = api().get;
  return await HTTPFactory.request<JoalState>(options);
};
