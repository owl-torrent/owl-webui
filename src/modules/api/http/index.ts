import axios from 'axios'
import { HttpApi } from "./types"
import { global } from './api.global'
import { config } from './api.config'
import { state } from './api.state'


const newHttpApi = (uri: string): HttpApi => {

  const instance = axios.create({
    baseURL: uri
  });

  return {
    rawAxios: instance,
    global: global(instance),
    state: state(instance),
    config: config(instance),
    //torrent: torrent(instance)
  }
}

export default newHttpApi