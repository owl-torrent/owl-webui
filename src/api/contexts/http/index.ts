import axios from 'axios'
import { HttpApi } from "./types"
import { config } from './config'


const newHttpApi = (uri: string): HttpApi => {

  const instance = axios.create({
    baseURL: uri
  });

  return {
    rawAxios: instance,
    config: config(instance),
    //torrent: torrent(instance)
  }
}

export default newHttpApi