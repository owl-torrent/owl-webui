import { Client } from "@stomp/stompjs"
import { StompApi } from "./types"


const newStompApi = (uri: string): StompApi => {
    const instance = new Client({
    brokerURL: uri,
    heartbeatIncoming: 15000,
    heartbeatOutgoing: 15000,
    reconnectDelay: 5000,
    //debug: console.log,
  });

  return {
    rawClient: instance,
  }
}

export default newStompApi
