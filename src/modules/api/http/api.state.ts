import {AxiosInstance} from 'axios'
import { JoalState } from "../types"
import { normalizeError } from './utils'

export const state = (axiosInstance: AxiosInstance) => ({
  get: async () => {
    try {
      const resp = await axiosInstance.get<JoalState>('/state')
      return resp.data
    } catch (error) {
      throw normalizeError(error)
    }
  }
})