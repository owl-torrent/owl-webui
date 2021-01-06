import client from "./HTTPFactory";
import config from "react-global-configuration";

const routes = () => config.get("api").clients

export const get_all = async () => {
    const options = routes().get
    return await client.get_instance()(options)
};