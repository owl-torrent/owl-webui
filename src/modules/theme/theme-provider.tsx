import React, { ReactNode } from 'react'
import { MuiThemeProvider, createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import primary from '@material-ui/core/colors/lightGreen'
import secondary from '@material-ui/core/colors/amber'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StyledEngineProvider } from '@material-ui/core'
import { Updater, useImmer } from 'use-immer'

const LOCAL_STORAGE_KEY = 'theme.theme-options'

const loadThemeOptions = (): ThemeOptions => {
  const defaultVal: ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        light: primary[300],
        main: primary[500],
        dark: primary[700],
      },
      secondary: {
        light: secondary[300],
        main: secondary[500],
        dark: secondary[700],
      },
    }
  }

  const lss = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (lss === null) { return defaultVal }

  try {
    const parsed = JSON.parse(lss)
    if (parsed !== undefined && parsed !== null) {
      return parsed
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
        const newMode = current.palette?.mode === 'light' ? 'dark' : 'light'
        current.palette = {...current.palette, mode: newMode}
      })
    }
  }
}