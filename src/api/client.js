import axios from "axios";
import { fetchConfig } from "../../config/index";
import config from "react-global-configuration";

class ClientSingleton {
    constructor() {
        if (!ClientSingleton.instance) {
            ClientSingleton.instance = this;
        }
        return ClientSingleton.instance;
    }

    client = axios.create({ baseURL: config.get("api").baseURL });

    get_instance() {
        return this.client;
    }
}

const instance = fetchConfig() && new ClientSingleton();
Object.freeze(instance);

export default instance;