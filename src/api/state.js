import client from "./HTTPFactory";
import config from "react-global-configuration";

const routes = () => config.get("api").state

export const get_initial_state = async () => {
    const options = routes().get
    return await client.get_instance()(options)
};