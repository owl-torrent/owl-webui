
import client from "./client";
import config from "react-global-configuration";

const api_config = config.get("configuration")

export const get_configuration = async (sign_id) => {
    return await client.get_instance()(api_config.get)
};