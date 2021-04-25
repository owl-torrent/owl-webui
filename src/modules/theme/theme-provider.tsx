import React, { ReactNode } from 'react'
import { MuiThemeProvider, createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { PaletteMode, StyledEngineProvider } from '@material-ui/core'
import { Updater, useImmer } from 'use-immer'

const LOCAL_STORAGE_MODE_KEY = 'theme.mode'

const persistThemeMode = (mode: PaletteMode | null) => {
  if (!mode) {
    localStorage.removeItem(LOCAL_STORAGE_MODE_KEY)
    return
  }
  localStorage.setItem(LOCAL_STORAGE_MODE_KEY, mode)
}
const getPersistedThemeMode = (): PaletteMode | null => {
  const mode = localStorage.getItem(LOCAL_STORAGE_MODE_KEY)
  if (mode === null) { return null }
  if (mode !== 'dark' && mode !== 'light') {
    console.warn(`LocalStage value for ${LOCAL_STORAGE_MODE_KEY} was ${mode}, accepted values are 'light' or 'dark', remove entry from localStage to prevent further errors.`)
    localStorage.removeItem(LOCAL_STORAGE_MODE_KEY)
    return null
  }

  return mode
}

const loadThemeOptions = (): ThemeOptions => {
  const userPreferedMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const opts: ThemeOptions = {
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

  const userChoiceMode = getPersistedThemeMode()
  if (userChoiceMode) {
    opts.palette!.mode = userChoiceMode
  }

  return opts
}

const initialState = loadThemeOptions()

const ThemeContext = React.createContext<ThemeOptions>(initialState)
const ThemeDispatchContext = React.createContext<Updater<ThemeOptions>>(() => { })


interface Props {
  children: ReactNode
}
const ThemeProvider: React.FC<Props> = (props) => {
  const [themeOpts, setThemeOpts] = useImmer(initialState)

  const theme = React.useMemo(() => {
    return createMuiTheme(themeOpts)
  }, [themeOpts])

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
        persistThemeMode(mode)

        current.palette = { ...current.palette, mode: mode }
      })
    }
  }
}