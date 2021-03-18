import React from 'react'
import {Brightness2Outlined as LightModeOnIcon, Brightness2 as DarkModeOnIcon} from '@material-ui/icons'
import { useThemeAlterator } from './theme-provider'
import { IconButton, Tooltip } from '@material-ui/core'


const ThemeAlterator: React.FC = () => {
  const { themeOpts, toggleThemeMode } = useThemeAlterator()
  if (!toggleThemeMode === undefined) {
    throw new Error("ThemeAlterator must be wrapped in a ThemeProvider")
  }

  return (
    <Tooltip title="Toggle theme" arrow>
      <IconButton aria-label="Switch theme type" onClick={toggleThemeMode}>
        {themeOpts.palette?.mode === 'dark'
          ? <DarkModeOnIcon htmlColor="#fff" />
          : <LightModeOnIcon htmlColor="#fff" />
        }
      </IconButton>
    </Tooltip>
  )
}

export default ThemeAlterator
