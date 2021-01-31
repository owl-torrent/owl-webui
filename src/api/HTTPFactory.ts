import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ApiCall } from "./Types/uiConfig";
class HTTPFactory {
  private static _instance: HTTPFactory;
  public client: AxiosInstance;
  private constructor() {
    this.client = axios.create({
      baseURL: "https://8aa37423-5867-4c17-913b-7cc23b16d780.mock.pstmn.io",
    });
  }

  public async request<T>(options: ApiCall): Promise<AxiosResponse<T>> {
    return await this.client.request<T>(options);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}

const instance = HTTPFactory.Instance;
Object.freeze(instance);

export default instance;
