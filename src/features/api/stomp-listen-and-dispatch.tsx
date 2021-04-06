import { StompSubscription } from '@stomp/stompjs'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useApis } from '../../modules/api'
import { replaceWholeState } from './actions.stomp'


const StompListenAndDispatch: React.FC<{}> = () => {
  const { apis: {isConnected, http, webSocket: stomp}} = useApis()
  const {enqueueSnackbar} = useSnackbar()
  const dispatch = useDispatch()

  React.useEffect(() => {
    let subscription: StompSubscription | undefined = undefined
    const f = async () => {
      if (!isConnected) {
        return
      }
      if (!http) {
        console.error('http client was not available')
        return
      }
      if (!stomp) {
        console.error('stomp client was not available')
        return
      }

      try {
        const state = await http.state.get()
        dispatch(replaceWholeState(state))
      } catch (e) {
        console.log(e)
        enqueueSnackbar(`failed to load initial state: ${e.message}`, {variant: 'error'})
      }

      subscription = stomp.rawClient.subscribe('/joal-core-events', (message) => {
        const joalCoreStompMessage: { type: string, payload: any} = JSON.parse(message.body)
        dispatch(joalCoreStompMessage)
      })
    }

    f()
    
    return () => {
      if (subscription) subscription.unsubscribe()
    }
  }, [isConnected, dispatch, enqueueSnackbar, http, stomp])

  return (<></>)
}

export default StompListenAndDispatch
