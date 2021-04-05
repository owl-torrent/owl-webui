import { Bandwidth, GlobalState, JoalConfig, Torrent, TorrentBandwidthMapState } from "../../modules/api/types";

export type SeedStartedPayload = Required<GlobalState>
export type SeedStoppedPayload = {}

export type ConfigHasChangedPayload = JoalConfig

export type TorrentAddedPayload = Torrent
export type TorrentChangedPayload = Torrent
export type TorrentRemovedPayload = Pick<Torrent, "infohash">

export type BandiwdthSpeedRangeChangedPayload = Pick<Bandwidth, "currentBandwidth">
export type BandiwdthSpeedDistributionChangedPayload = TorrentBandwidthMapState
