import { Method } from "axios";

export interface ApiCall {
  url: string;
  method: Method;
  params?: Object;
  data?: Object;
  headers?: Object;
}

export interface SeedApi {
  start: ApiCall;
  stop: ApiCall;
}

export interface ConfigurationApi {
  get: ApiCall;
  change: ApiCall;
}

export interface TorrentsApi {
  delete: ApiCall;
  add: ApiCall;
}

export interface ClientsApi {
  get: ApiCall;
}

export interface StateApi {
  get: ApiCall;
}

interface Api {
  seed: SeedApi;
  configuration: ConfigurationApi;
  torrents: TorrentsApi;
  clients: ClientsApi;
  state: StateApi;
}

export interface ConfigObject {
  api: Api;
  globalStateKeys: string[];
}
