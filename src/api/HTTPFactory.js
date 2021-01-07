import axios from "axios";

class HTTPFactory {
    constructor() {
        if (!HTTPFactory.instance) {
            HTTPFactory.instance = this;
        }
        return HTTPFactory.instance;
    }

    client = axios.create({ baseURL: "https://8aa37423-5867-4c17-913b-7cc23b16d780.mock.pstmn.io" });

    get_instance() {
        return this.client;
    }
}

const instance = new HTTPFactory();
Object.freeze(instance);

export default instance;