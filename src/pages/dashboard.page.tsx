import React from 'react'
import { Container, Divider, Grid, Paper, PaperProps, Tooltip, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { HelpOutline as HelpOutlineIcon } from '@material-ui/icons'
import clsx from 'clsx'
import filesize from 'filesize'
import { useSelector } from 'react-redux'
import { bandwidthSelectors, globalSelectors, torrentsSelectors } from '../features/api'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3)
    },
    tileRoot: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tileBodyGreenBackground: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.getContrastText(theme.palette.success.light)
    },
    tileBodyRedBackground: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.getContrastText(theme.palette.error.light)
    },
    tileTitle: {
      display: 'flex',
      textAlign: 'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(0.5),
      color: theme.palette.text.secondary
    },
    tileHelperTooltipIcon: {
      marginLeft: theme.spacing(1),
      cursor: 'pointer',
    },
    tileBody: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1),
      minHeight: 30
    },
  }),
)


interface Props {
}

const Dashboard: React.FC<Props> = () => {
  const classes = useStyles()

  React.useEffect(() => { document.title = "JOAL - Dashboard" }, [])

  return (
    <Container maxWidth="sm" className={classes.root}>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <GlobalStateTile />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TorrentCountTile />
            </Grid>
            <Grid item xs={6}>
              <TorrentWithUploadTile />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="flex-start">
            <Grid item xs={12}>
              <OverallUploadSpeedTile />
            </Grid>
            <Grid item xs={12}>
              <UploadPerHourTile />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
              ratio calculator (input= down, seed) output = how many percent in 1 hour)
              </Grid>
          </Grid>
        </Grid>


      </Grid>
    </Container>
  )
}



interface TileProps extends Pick<PaperProps, "elevation" | "className"> {
  title: string
  helperTooltip?: string
  omitDivider?: boolean
  body: React.ReactNode
  titleClassName?: string
  bodyClassName?: string
}

const Tile: React.FC<TileProps> = (props) => {
  const { title, helperTooltip, omitDivider, body, titleClassName, bodyClassName, elevation = 4, className } = props
  const classes = useStyles()

  return <Paper elevation={elevation} className={clsx(className, classes.tileRoot)}>
    <div className={clsx(classes.tileTitle, titleClassName)}>
      <Typography variant="overline" sx={{ lineHeight: 1.7 }}>
        {title}
      </Typography>
      {helperTooltip && <Tooltip className={classes.tileHelperTooltipIcon} placement="top" title={helperTooltip}><HelpOutlineIcon fontSize="small" /></Tooltip>}
    </div>
    {!omitDivider && <Divider sx={{ width: '100%' }} />}
    <div className={clsx(classes.tileBody, bodyClassName)}>
      {body}
    </div>
  </Paper>
}

const GlobalStateTile: React.FC = () => {
  const classes = useStyles()
  const globalState = useSelector(globalSelectors.selectGlobal)

  return <Tile
    title="Global state"
    bodyClassName={clsx({ [classes.tileBodyGreenBackground]: globalState.started, [classes.tileBodyRedBackground]: !globalState.started })}
    body={<div>
      <Typography variant="h5" component="div">
        {`Joal is ${globalState.started ? 'Seeding' : 'Stopped'}`}
      </Typography>
      {globalState.client && <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {`${globalState.client.name} v${globalState.client.version}`}
      </Typography>}
    </div>}
  />
}

const TorrentCountTile: React.FC = () => {
  const torrent = useSelector(torrentsSelectors.selectTorrents)
  const torrentCount = React.useMemo(() => Object.keys(torrent).length, [torrent])

  if (torrentCount === 0) {
    return <></>
  }

  return <Tile
    title="Torrents"
    helperTooltip="Total number of torrent present in JOAL at the moment"
    body={<Typography fontWeight="500" variant="h2">
      {torrentCount}
    </Typography>}
  />
}

const TorrentWithUploadTile: React.FC = () => {
  const bandwidth = useSelector(bandwidthSelectors.selectBandwidth)

  const torrentWithUploadSpeed = React.useMemo(() => {
    return Object.keys(bandwidth.torrents).filter(infohash => bandwidth.torrents[infohash].percentOfBandwidth > 0.0).length
  }, [bandwidth.torrents])


  if (Object.keys(bandwidth.torrents).length === 0) {
    return <></>
  }

  return <Tile
    title="Active torrents"
    helperTooltip="Total number of torrent with upload speed greater than 0"
    body={<Typography fontWeight="500" variant="h2">
      {torrentWithUploadSpeed}
    </Typography>}
  />
}

const OverallUploadSpeedTile: React.FC = () => {
  const bandwidth = useSelector(bandwidthSelectors.selectBandwidth)

  const overallSpeed = React.useMemo(() => {
    return bandwidth.currentBandwidth
  }, [bandwidth.currentBandwidth])

  if (Object.keys(bandwidth.torrents).length === 0) {
    return <></>
  }

  return <Tile
    title="Upload speed"
    helperTooltip="The current speed at which JOAL uploads"
    body={<Typography fontWeight="500" variant="h3">
      {`${filesize(overallSpeed, { base: 10 })}/s`}
    </Typography>}
  />
}

const UploadPerHourTile: React.FC = () => {
  const bandwidth = useSelector(bandwidthSelectors.selectBandwidth)

  const uploadPerHour = React.useMemo(() => {
    return bandwidth.currentBandwidth * 60 * 60
  }, [bandwidth.currentBandwidth])

  if (Object.keys(bandwidth.torrents).length === 0) {
    return <></>
  }

  return <Tile
    title="Upload per hour"
    helperTooltip="Upload generated by hour, based on current speed"
    body={<Typography fontWeight="500" variant="h3">
      {`${filesize(uploadPerHour, { base: 10 })}`}
    </Typography>}
  />
}



export default Dashboard
