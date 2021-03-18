import React from 'react'
import "@fontsource/roboto"
import App from './App'
import { Provider } from 'react-redux'
import configureAppStore from './store/store'
import ApiProvider from './modules/api/contexts/provider'
import ThemeProvider from './modules/theme/theme-provider'

const store = configureAppStore()



const Root: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ApiProvider>
    </Provider>
  </React.StrictMode>
)

export default Root
