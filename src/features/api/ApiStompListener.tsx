import { StompSubscription } from '@stomp/stompjs'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useApis } from '../../modules/api/contexts/provider'
import {globalActions} from './global.slice'
import { SeedStartedPayload, SeedStoppedPayload } from './types'
import { replaceWholeState } from './utils'


const ApiStompListener: React.FC<{}> = () => {
  const { apis: {isConnected, http, webSocket: stomp}} = useApis()
  const {enqueueSnackbar} = useSnackbar()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const f = async () => {
      if (!isConnected) {
        console.log('ApiStompListener.tsx => reset state?')
        return
      }
      if (!http) {
        console.error('http client was not available')
        return
      }

      try {
        const state = await http.state.get()
        dispatch(replaceWholeState(state))
      } catch (e) {
        console.log(e)
        enqueueSnackbar(`Impossible de charger l'état initial: ${e.message}`, {variant: 'error'})
      }
    }

    f()
  }, [isConnected])

  React.useEffect(() => {
    if (!isConnected || !stomp) {
      return
    }
    const subscriptions: Array<StompSubscription> = []
    subscriptions.push(stomp.rawClient.subscribe('/seed/started', (message) => {
      const payload: SeedStartedPayload = JSON.parse(message.body)
      dispatch(globalActions.seedStarted(payload))
    }))
    subscriptions.push(stomp.rawClient.subscribe('/seed/stopped', (message) => {
      const payload: SeedStoppedPayload = JSON.parse(message.body)
      dispatch(globalActions.seedStopped(payload))
    }))

    return () => {
      subscriptions.forEach(
        sub => {sub.unsubscribe()}
      )
    }
  }, [stomp, isConnected, dispatch])

  return (<></>)
}

export default ApiStompListener
