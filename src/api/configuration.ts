import HTTPFactory from "./HTTPFactory";
import config from "../configuration";

export const get_configuration = async () => {
  const apicall = config().api.configuration.get;
  return await HTTPFactory.request(apicall);
};

export const change_configuration = async (data: Object) => {
  const apicall = config().api.configuration.change;
  return await HTTPFactory.request({
    ...apicall,
    data,
  });
};
