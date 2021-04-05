import { createAction } from "@reduxjs/toolkit";
import { BandiwdthSpeedDistributionChangedPayload, BandiwdthSpeedRangeChangedPayload, ConfigHasChangedPayload, SeedStartedPayload, TorrentAddedPayload, TorrentChangedPayload, TorrentRemovedPayload } from "./types.stomp-payloads";


export const seedStarted = createAction<SeedStartedPayload>('@STOMP_API/SEED/STARTED')
export const seedStopped = createAction<SeedStartedPayload>('@STOMP_API/SEED/STOPPED')

export const configChanged = createAction<ConfigHasChangedPayload>('@STOMP_API/CONFIG/CHANGED')

export const torrentAdded = createAction<TorrentAddedPayload>('@STOMP_API/TORRENT/ADDED')
export const torrentChanged = createAction<TorrentChangedPayload>('@STOMP_API/TORRENT/CHANGED')
export const torrentRemoved = createAction<TorrentRemovedPayload>('@STOMP_API/TORRENT/REMOVED')

export const bandwidthRangeChanged = createAction<BandiwdthSpeedRangeChangedPayload>('@STOMP_API/BANDWIDTH/RANGE_CHANGED')
export const bandwidthDistributionChanged = createAction<BandiwdthSpeedDistributionChangedPayload>('@STOMP_API/BANDWIDTH/DISTRIBUTION_CHANGED')
