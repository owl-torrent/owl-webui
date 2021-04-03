import axios from 'axios'
import { HttpApi } from "./types"
import { config } from './config'
import { state } from './state';


const newHttpApi = (uri: string): HttpApi => {

  const instance = axios.create({
    baseURL: uri
  });

  return {
    rawAxios: instance,
    state: state(instance),
    config: config(instance),
    //torrent: torrent(instance)
  }
}

export default newHttpApi