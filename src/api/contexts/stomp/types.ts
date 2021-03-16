import { Client } from '@stomp/stompjs'


export interface StompApi {
  rawClient: Client
}