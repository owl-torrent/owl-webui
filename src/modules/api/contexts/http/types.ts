import {AxiosInstance} from 'axios'
import {JoalState, RuntimeConfig} from '../../types'

export interface HttpApi {
  rawAxios: AxiosInstance,
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