import {AxiosInstance, AxiosResponse} from 'axios'
import { RuntimeConfig } from "../types"
import { normalizeError } from './utils'

export const config = (axiosInstance: AxiosInstance) => ({
  get: async () => {
    try {
      const resp = await axiosInstance.get<RuntimeConfig>('/configuration')
      return resp.data
    } catch (error) {
      throw normalizeError(error)
    }
  },
  update: async (newConfig: RuntimeConfig) => {
    try {
      const resp = await axiosInstance.put<RuntimeConfig, AxiosResponse<RuntimeConfig>>('/configuration', newConfig)
      return resp.data
    } catch (error) {
      throw normalizeError(error)
    }
  }
})