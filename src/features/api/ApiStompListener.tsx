import { useSnackbar } from 'notistack'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useApis } from '../../modules/api/contexts/provider'
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
  }, [isConnected, dispatch, enqueueSnackbar, http])

  React.useEffect(() => {
    if (!isConnected || !stomp) {
      return
    }
    const subscription = stomp.rawClient.subscribe('/joal-core-events', (message) => {
      const joalCoreStompMessage: { type: string, payload: any} = JSON.parse(message.body)
      dispatch(joalCoreStompMessage)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [stomp, isConnected, dispatch])

  return (<></>)
}

export default ApiStompListener
