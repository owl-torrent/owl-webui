import {AxiosInstance} from 'axios'
import {JoalState, RuntimeConfig} from '../types'

export interface HttpApi {
  rawAxios: AxiosInstance,
  global: {
    start: () => Promise<void>
    stop: () => Promise<void>
  }
  state: {
    get: () => Promise<JoalState>
  },
  config: {
    get: () => Promise<RuntimeConfig>,
    update: (newConfig: RuntimeConfig) => Promise<RuntimeConfig>,
  },
  /*torrent: {
    add: () => void
    remove: (infohash: string) => void
  }*/
}