interface Client {
  name: string;
  version: string;
}

interface RuntimeConfig {
  minimumBytesPerSeconds: number;
  maximumBytesPerSeconds: number;
  client: string;
}

interface Config {
  needRestartToTakeEffect: boolean;
  runtimeConfig: RuntimeConfig;
}

interface AnnounceHistory {
  wasSuccessful: string;
  datetime: string;
  seeders: number;
  leechers: number;
  interval: number;
  error: string;
}

interface Tracker {
  url: string;
  isAnnouncing: boolean;
  inUse: boolean;
  seeders: number;
  leechers: number;
  interval: number;
  announceHistory: AnnounceHistory[];
}

interface Torrent {
  infohash: string;
  name: string;
  file: string;
  size: number;
  isAnnouncing: boolean;
  seeders: number;
  leechers: number;
  uploaded: number;
  trackers: { [hashKey: string]: Tracker };
}

interface TorrentBandWidth {
  infohash: string;
  percentOfBandwidth: number;
}

interface Bandwidth {
  currentBandwidth: number;
  torrents: { [hashKey: string]: TorrentBandWidth };
}

export interface JoalState {
  started: string;
  client: Client;
  config: Config;
  torrents: { [hashKey: string]: Torrent };
  bandwidth: Bandwidth;
}
