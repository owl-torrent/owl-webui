import { IFrame } from '@stomp/stompjs';
import React from 'react'
import newHttpApi from './http';
import newStompApi from './stomp';
import { ApiConnectionParamsTypes, ApiContextType } from './types';
import {useImmer, Updater} from 'use-immer';

const LOCAL_STORAGE_KEY = 'api.connections-parameters'

const loadConnectionParams = (): ApiConnectionParamsTypes => {
  const defaultVal = {
    host: window.location.hostname,
    port: window.location.port || (window.location.protocol === 'https' ? '443' : '80'),
    secure: window.location.protocol === 'https' ? true : false,
    pathPrefix: window.location.pathname.split('/')[1] || ''
  }
  const params = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!params) {
    return defaultVal
  }
  
  try {
    return JSON.parse(params)
  } catch (error) {
    console.log('failed to parse stored connection parameters, fallback to default')
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    return defaultVal
  }
}
const persistConnectionParams = (params: ApiConnectionParamsTypes) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(params))
}

const initialState: ApiContextType = {
  connectionParams: loadConnectionParams(),
  isConnected: false,
}

const buildHttpApiUri = (params: ApiConnectionParamsTypes) => {
  const httpProto = params.secure? 'https' : 'http'
  const includePort =  (params.port && params.port !=='') && ((params.secure && params.port !== '443' ) || (!params.secure && params.port !== '80'))
  const prefixWithoutSlash = params.pathPrefix.startsWith('/') ? params.pathPrefix.substring(1) : params.pathPrefix

  return `${httpProto}://${params.host}${includePort ? `:${params.port}` : ''}/${prefixWithoutSlash}/api`
}
const buildWsApiUri = (params: ApiConnectionParamsTypes) => {
  const wsProto = params.secure? 'wss' : 'ws'
  const includePort =  (params.port && params.port !=='') && ((params.secure && params.port !== '443' ) || (!params.secure && params.port !== '80'))
  const prefixWithoutSlash = params.pathPrefix.startsWith('/') ? params.pathPrefix.substring(1) : params.pathPrefix

  return `${wsProto}://${params.host}${includePort ? `:${params.port}` : ''}/${prefixWithoutSlash}/ws`
}

const ApiContext = React.createContext<ApiContextType>(initialState)
const ApiDispatchContext = React.createContext<Updater<ApiContextType>>(() => {})

const ApiProvider = ({children}: {children: React.ReactElement}) => {
  const [state, setState] = useImmer<ApiContextType>(initialState)

  React.useEffect(() => {
    if (state.connectionParams.host === '' || state.connectionParams.port === '' || state.connectionParams.pathPrefix === '') {
      return
    }

    const httpApi = newHttpApi(buildHttpApiUri(state.connectionParams))
    const stompApi = newStompApi(buildWsApiUri(state.connectionParams))

    setState(st => {
      st.http = httpApi
      st.webSocket = stompApi
    })

    stompApi.rawClient.onConnect = (f) => {
      console.log('stomp connected succesfully', f)
      setState(current => {
        current.isConnected = true
      })
    }
    stompApi.rawClient.onDisconnect = () => {
      setState(current => {
        current.isConnected = false
      })
    }
    stompApi.rawClient.onStompError = (receipt: IFrame) => {
      console.log('onStompError', receipt.body)
    }
    stompApi.rawClient.onWebSocketError = (e: Event) => {
      console.log('onWebSocketError', e)
    }
    
    stompApi.rawClient.activate()

    return () => {
      stompApi.rawClient.onConnect = () => {}
      stompApi.rawClient.onDisconnect = () => {}
      stompApi.rawClient.deactivate()
    }
  }, [setState, state.connectionParams, state.connectionParams.host, state.connectionParams.port, state.connectionParams.secure, state.connectionParams.pathPrefix])

  return (
    <ApiContext.Provider value={state}>
      <ApiDispatchContext.Provider value={setState}>
        {children}
      </ApiDispatchContext.Provider>
    </ApiContext.Provider>
  )
}

export const useApis = () => {
  const context = React.useContext(ApiContext)
  const setState = React.useContext(ApiDispatchContext)
  if (context === undefined) {
    throw new Error('useApis must be used within an ApiProvider')
  }
  return {
    apis: context,
    changeConnectionParams: (host: string, port: string, secure: boolean, pathPrefix: string) => {
      const params: ApiConnectionParamsTypes = {
        host: host,
        port: port,
        secure: secure,
        pathPrefix: pathPrefix
      }
  
      persistConnectionParams(params)
      setState(current => {
        current.connectionParams = params
      })
    },
    disconnect: async () => {
      await context.webSocket?.rawClient.deactivate()
    }
  }
}

export const useHttpApi = () => {
  const context = React.useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useHttpApi must be used within an ApiProvider')
  }
  if (!context.http) {
    throw new Error('http api should have been initialized')
  }
  return context.http
}

export const useStompApi = () => {
  const context = React.useContext(ApiContext)
  if (context === undefined) {
    throw new Error('useStompApi must be used within an ApiProvider')
  }
  if (!context.webSocket) {
    throw new Error('http api should have been initialized')
  }
  return context.webSocket
}

export default ApiProvider
