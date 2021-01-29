import axios, { AxiosInstance } from "axios";

class HTTPFactory {
  private static _instance: HTTPFactory;
  public client: AxiosInstance;
  private constructor() {
    this.client = axios.create({
      baseURL: "https://8aa37423-5867-4c17-913b-7cc23b16d780.mock.pstmn.io",
    });
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }
}

const instance = HTTPFactory.Instance;
Object.freeze(instance);

export default instance;
