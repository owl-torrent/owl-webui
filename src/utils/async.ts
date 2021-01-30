import axios, { AxiosResponse } from "axios";
export interface Fetchable<T> {
  fetchIt(): Promise<AxiosResponse<T>>;
}

export class Fetcher<T> implements Fetchable<T> {
  constructor(private endpoint: string) {}

  fetchIt = () => {
    const { endpoint } = this;
    return axios.get<T>(endpoint);
  };
}
