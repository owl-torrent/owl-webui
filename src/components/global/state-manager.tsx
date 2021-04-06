import React from 'react'
import { Button, createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { globalSelectors } from '../../features/api'
import { useHttpApi } from '../../modules/api'
import { useSnackbar } from 'notistack'
import { PlayCircle as PlayCircleIcon, StopCircle as StopCircleIcon } from '@material-ui/icons'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => createStyles({
  startActionButton: {
    color: theme.palette.success.main
  },
  stopActionButton: {
    color: theme.palette.error.main
  },
  composed: {
    padding: 50
  }
}))

const StateManager: React.FC = () => {
  const httpApi = useHttpApi()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const isSeedStarted = useSelector(globalSelectors.selectIsSeedStarted)
  
  const [loading, setLoading] = React.useState(false)

  const ActionButton = React.useMemo(() => {
    const handleClick = async () => {
      setLoading(true)
      try {
        await (isSeedStarted ? httpApi.global.stop() : httpApi.global.start())
      } catch (e) {
        enqueueSnackbar(e.message, { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    return (
      <Button
        className={clsx({[classes.startActionButton]: !isSeedStarted, [classes.stopActionButton]: isSeedStarted})}
        fullWidth
        color="inherit"
        variant="outlined"
        onClick={handleClick}
        startIcon={isSeedStarted ? <StopCircleIcon /> : <PlayCircleIcon />}>{isSeedStarted ? 'stop' : 'start'}
      </Button>
    )
  }, [isSeedStarted, classes, enqueueSnackbar, httpApi])

  return (
    <Grid container>
      <Grid item xs={12}>
        {ActionButton}
      </Grid>
      {`fetching: ${Boolean(loading).toString()}`}
    </Grid>
  )
}


export default StateManager
