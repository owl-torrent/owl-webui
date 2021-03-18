import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import LightModeOnIcon from '@material-ui/icons/Brightness2Outlined'
import DarkModeOnIcon from '@material-ui/icons/Brightness2'
import { useThemeAlterator } from './theme-provider'


const ThemeAlterator: React.FC = () => {
  const { themeOpts, toggleThemeMode } = useThemeAlterator()
  if (!toggleThemeMode === undefined) {
    throw new Error("ThemeAlterator must be wrapped in a ThemeProvider")
  }

  return (
    <div>
      <IconButton aria-label="Switch theme type" onClick={toggleThemeMode}>
        {themeOpts.palette?.mode === 'dark'
          ? <DarkModeOnIcon htmlColor="#fff" />
          : <LightModeOnIcon htmlColor="#fff" />
        }
      </IconButton>
    </div>
  )
}

export default ThemeAlterator
