import React from 'react'
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { bandwidthSelectors, globalSelectors } from '../../features/api'
import { torrentsSelectors } from '../../features/api'
import { dashboardActions, dashboardSelectors } from '../../features/ui'
import { useHttpApi } from '../../modules/api'
import { useSnackbar } from 'notistack'
import { PlayCircle as PlayCircleIcon, StopCircle as StopCircleIcon } from '@material-ui/icons'
import clsx from 'clsx'
import { LoadingButton } from '@material-ui/lab'
import filesize from 'filesize'

const useStyles = makeStyles((theme: Theme) => createStyles({
  startActionButton: {
    color: theme.palette.success.main
  },
  stopActionButton: {
    color: theme.palette.error.main
  },
}))

const StateManager: React.FC = () => {
  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <GlobalStateActionButton />
    </Grid>
    <Grid item xs={12}>
      <ClientDescription />
    </Grid>
    <Grid item xs={12}>
      <TorrentStats />
    </Grid>
  </Grid>
}

const GlobalStateActionButton: React.FC = () => {
  const httpApi = useHttpApi()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const isSeedStarted = useSelector(globalSelectors.selectIsSeedStarted)
  const isStartingOrStopping = useSelector(dashboardSelectors.selectIsstartingOrStopping)
  const dispatch = useDispatch()
  const { setStartingOrStopping } = dashboardActions

  const handleClick = async () => {
    dispatch(setStartingOrStopping(true))
    try {
      await (isSeedStarted ? httpApi.global.stop() : httpApi.global.start())
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' })
    } finally {
      dispatch(setStartingOrStopping(false))
    }
  }

  return (
    <LoadingButton
      className={clsx({[classes.startActionButton]: !isSeedStarted, [classes.stopActionButton]: isSeedStarted})}
      fullWidth
      color="inherit"
      variant="outlined"
      pending={isStartingOrStopping}
      pendingPosition="start"
      onClick={handleClick}
      startIcon={isSeedStarted ? <StopCircleIcon /> : <PlayCircleIcon />}>
        {isSeedStarted ? (isStartingOrStopping? 'stopping...' : 'stop') : (isStartingOrStopping? 'starting...' : 'start')}
    </LoadingButton>
  )
}

const ClientDescription: React.FC = () => {
  const globalState = useSelector(globalSelectors.selectGlobal)

  if (!globalState.client) {
    return <></>
  }
  return <Typography align="center" variant="subtitle2">
    {`${globalState.client.name} v${globalState.client.version}`}
  </Typography>
}

const TorrentStats: React.FC = () => {
  const torrent = useSelector(torrentsSelectors.selectTorrents)
  const bandwidth = useSelector(bandwidthSelectors.selectBandwidth)

  const torrentCount = React.useMemo(() => Object.keys(torrent).length, [torrent])
  const torrentWithUploadSpeed = React.useMemo(() => {
    return Object.keys(bandwidth.torrents).filter(infohash => bandwidth.torrents[infohash].percentOfBandwidth > 0.0).length
  }, [bandwidth.torrents])
  const overallSpeed = React.useMemo(() => {
    if (torrentWithUploadSpeed === 0) {
      return 0
    }
    return bandwidth.currentBandwidth
  }, [bandwidth.currentBandwidth, torrentWithUploadSpeed])

  if (torrentCount === 0) {
    return <></>
  }

  return <>
    <div>
      <Typography variant="body2" display="inline">
        {'Overall upload speed: '}
      </Typography>
      <Typography variant="body2" display="inline" fontWeight={500}>
        {`${filesize(overallSpeed, { base: 10 })}/s`}
      </Typography>
    </div>
    <div>
      <Typography variant="body2" display="inline">
        {'Torrents seeding: '}
      </Typography>
      <Typography variant="body2" display="inline"  fontWeight={500}>
        {torrentCount}
      </Typography>
    </div>
    <div>
      <Typography variant="body2" display="inline">
        {'Torrents producing upload: '}
      </Typography>
      <Typography variant="body2" display="inline" fontWeight={500}>
        {torrentWithUploadSpeed}
      </Typography>
    </div>
  </>
}


export default StateManager
