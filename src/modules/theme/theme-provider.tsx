import React, { ReactNode } from 'react'
import { MuiThemeProvider, createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StyledEngineProvider } from '@material-ui/core'
import { Updater, useImmer } from 'use-immer'

const LOCAL_STORAGE_KEY = 'theme.theme-options.v1'

const loadThemeOptions = (): ThemeOptions => {
  const userPreferedMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const defaultVal: ThemeOptions = {
    palette: {
      mode: userPreferedMode,
      primary: {
        main: '#4fc3f7'
      },
      secondary: {
        main: '#7cb342'
      },
    }
  }

  const lss = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (lss === null) { return defaultVal }

  try {
    const parsed = JSON.parse(lss)
    if (parsed !== undefined && parsed !== null) {
      return Object.assign({}, defaultVal, parsed)
    }
  } catch (err) {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }
  return defaultVal
}

const persistThemeOptions = (themeOptions: ThemeOptions) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(themeOptions))
}

const initialState = loadThemeOptions()

const ThemeContext = React.createContext<ThemeOptions>(initialState)
const ThemeDispatchContext = React.createContext<Updater<ThemeOptions>>(() => {})


interface Props {
  children: ReactNode
}
const ThemeProvider: React.FC<Props> = (props) => {
  const [themeOpts, setThemeOpts] = useImmer(initialState)

  const theme = React.useMemo(() => {
    persistThemeOptions(themeOpts)
    return createMuiTheme(themeOpts)
  } ,[themeOpts])

  return (
    <ThemeContext.Provider value={themeOpts}>
      <ThemeDispatchContext.Provider value={setThemeOpts}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {props.children}
          </MuiThemeProvider>
        </StyledEngineProvider>
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

export const useThemeAlterator = () => {
  const state = React.useContext(ThemeContext)
  const setState = React.useContext(ThemeDispatchContext)

  return {
    themeOpts: state,
    toggleThemeMode: () => {
      setState(current => {
        const mode = current.palette?.mode === 'light' ? 'dark' : 'light'
        
        current.palette = {...current.palette, mode: mode}
      })
    }
  }
}