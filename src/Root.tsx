import React from 'react'
import "@fontsource/roboto"
import App from './App'
import { Provider } from 'react-redux'
import configureAppStore from './store/store'
import ApiProvider from './api/contexts/provider'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider'

const store = configureAppStore()

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});


const Root: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </ApiProvider>
    </Provider>
  </React.StrictMode>
)

export default Root
