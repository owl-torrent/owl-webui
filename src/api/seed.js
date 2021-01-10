import client from "./HTTPFactory";
import config from "react-global-configuration";

const routes = () => config.get("api").seed

export const start_seed = async () => {
    const options = routes().start
    return await client.get_instance()(options)
};

export const stop_seed = async () => {
    const options = routes().stop
    return await client.get_instance()(options)
};