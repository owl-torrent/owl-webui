import { Method } from "axios";

interface ApiCall {
  url: string;
  method: Method;
}

interface Seed {
  start: ApiCall;
  stop: ApiCall;
}

interface Configuration {
  get: ApiCall;
  change: ApiCall;
}

interface Torrents {
  delete: ApiCall;
}

interface Clients {
  get: ApiCall;
}

interface State {
  get: ApiCall;
}

interface Api {
  seed: Seed;
  configuration: Configuration;
  torrents: Torrents;
  clients: Clients;
  state: State;
}

export interface ConfigObject {
  api: Api;
  globalStateKeys: string[];
}
