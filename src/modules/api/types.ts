export interface Client {
  name: string
  version: string
}

export interface GlobalState {
  started: boolean
  client?: Client
}

export interface RuntimeConfig {
  minimumBytesPerSeconds: number
  maximumBytesPerSeconds: number
  client: string
}

export interface JoalConfig {
  needRestartToTakeEffect: boolean
  runtimeConfig: RuntimeConfig
}

interface AnnounceHistory {
  wasSuccessful: string
  datetime: string
  seeders: number
  leechers: number
  interval: number
  error: string
}

export interface Tracker {
  url: string
  isAnnouncing: boolean
  inUse: boolean
  seeders: number
  leechers: number
  interval: number
  announceHistory: AnnounceHistory[]
}

export interface Torrent {
  infohash: string
  name: string
  file: string
  size: number
  isAnnouncing: boolean
  seeders: number
  leechers: number
  uploaded: number
  trackers: { [hashKey: string]: Tracker }
}

export interface TorrentBandWidth {
  infohash: string
  percentOfBandwidth: number
}

export type TorrentBandwidthMapState = { [hashKey: string]: Torrent }

export interface Bandwidth {
  currentBandwidth: number
  torrents: TorrentBandwidthMapState
}

export type TorrentMapState = { [hashKey: string]: Torrent }

export interface JoalState {
  global: GlobalState
  config: JoalConfig
  torrents: TorrentMapState
  bandwidth: Bandwidth
}
