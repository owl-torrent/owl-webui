import {AxiosInstance} from 'axios'
import {RuntimeConfig} from '../../types'

export interface HttpApi {
  rawAxios: AxiosInstance,
  config: {
    get: () => Promise<RuntimeConfig>,
    update: (newConfig: RuntimeConfig) => Promise<RuntimeConfig>,
  },
  /*torrent: {
    add: () => void
    remove: (infohash: string) => void
  }*/
}