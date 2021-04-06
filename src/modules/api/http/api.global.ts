import {AxiosInstance} from 'axios'
import { normalizeError } from './utils'

export const global = (axiosInstance: AxiosInstance) => ({
  start: async () => {
    try {
      await axiosInstance.post('/start')
      return
    } catch (error) {
      throw normalizeError(error)
    }
  },
  stop: async () => {
    try {
      await axiosInstance.post('/stop')
      return
    } catch (error) {
      throw normalizeError(error)
    }
  }
})