import React from 'react'
import { useApis } from '../contexts/provider'
import { createStyles, IconButton, makeStyles, Theme, Tooltip } from '@material-ui/core'
import { Wifi as ConnectedIcon, WifiOff as DisconnectedIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => createStyles({
  connected: {
    color: '#fff'
  },
  disconnected: {
    color: theme.palette.error.main
  }
}))

const StompAuthButton: React.FC = () => {
  const classes = useStyles()
  const { apis: { isConnected }, disconnect } = useApis()

  return (
    <Tooltip title="API connection parameters" arrow>
      <IconButton onClick={disconnect}>
        {isConnected
          ? <ConnectedIcon className={classes.connected} />
          : <DisconnectedIcon className={classes.disconnected} />
        }
      </IconButton>
    </Tooltip>
  )
}

export default StompAuthButton
