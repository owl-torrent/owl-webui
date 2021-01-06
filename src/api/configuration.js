import client from "./HTTPFactory";
import config from "react-global-configuration";

const routes = () => config.get("api").configuration;

export const get_configuration = async () => {
    return await client.get_instance()(routes().get)
};

export const change_configuration = async (data) => {
    return await client.get_instance()({ ...routes().change, data })
}