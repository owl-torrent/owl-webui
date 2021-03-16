import {HttpApi} from './http/types'
import { StompApi } from './stomp/types'

export interface ApiConnectionParamsTypes {
  host: string,
  port: string,
  secure: boolean,
  pathPrefix: string
}

export interface ApiContextType {
  connectionParams: ApiConnectionParamsTypes,
  isConnected: boolean,
  http?: HttpApi,
  webSocket?: StompApi
}
