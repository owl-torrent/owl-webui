import React from 'react'
import "@fontsource/roboto"
import App from './App'
import { Provider } from 'react-redux'
import { SnackbarProvider, SnackbarKey } from 'notistack'
import configureAppStore from './store/store'
import { ApiProvider } from './modules/api'
import ThemeProvider from './modules/theme/theme-provider'
import { IconButton } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import StompListenAndDispatch from './features/api/stomp-listen-and-dispatch'

const store = configureAppStore()



const Root: React.FC = () => {
  const notistackRef = React.createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef.current?.closeSnackbar(key);
  }

  return (
    <React.StrictMode>
      <Provider store={store}>
        <SnackbarProvider maxSnack={5} ref={notistackRef}
          action={(key) => (
            <IconButton
              onClick={onClickDismiss(key)}
              size="small"
              aria-label="close"
              color="inherit"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        >
          <ApiProvider>
            <>
              <StompListenAndDispatch />
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </>
          </ApiProvider>
        </SnackbarProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default Root
