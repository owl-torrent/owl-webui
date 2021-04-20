import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import PageLayout from '../layouts/default.layout'
import { Button, Card, CardActions, CardContent, Container, Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { globalSelectors, torrentsSelectors, bandwidthSelectors } from '../features/api'
import { useHistory } from 'react-router'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3)
    },
    tilesContentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
)

const ClientDescriptionCard: React.FC = () => {
  const classes = useStyles()
  const globalState = useSelector(globalSelectors.selectGlobal)

  return <Card variant="outlined">
    <CardContent className={classes.tilesContentWrapper}>
      <Typography sx={{ fontSize: 14 }} gutterBottom variant="subtitle2">
        Global state
      </Typography>
      <Typography variant="h5" component="div">
        {`Joal is ${globalState.started ? 'Seeding' : 'Stopped'}`}
      </Typography>
      {globalState.client && <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {`${globalState.client.name} v${globalState.client.version}`}
      </Typography>}
    </CardContent>
  </Card>
}

const TorrentCards: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const torrent = useSelector(torrentsSelectors.selectTorrents)
  const bandwidth = useSelector(bandwidthSelectors.selectBandwidth)
  
  const torrentCount = React.useMemo(() => Object.keys(torrent).length, [torrent])
  const torrentWithUploadSpeed = React.useMemo(() => {
    return Object.keys(bandwidth.torrents).filter(infohash => bandwidth.torrents[infohash].percentOfBandwidth > 0.0).length
  }, [bandwidth.torrents])


  if (torrentCount === 0) {
    return <></>
  }

  return <Grid container justifyContent="space-evenly">
    <Grid item xs={6} md={4}>
      <Card variant="outlined">
        <CardContent className={classes.tilesContentWrapper}>
          <Typography sx={{ fontSize: 14 }} gutterBottom variant="subtitle2">
            Number of torrents
        </Typography>
          <Typography variant="h5" component="div">
            {torrentCount}
          </Typography>
        </CardContent>
        <CardActions className={classes.tilesContentWrapper}>
          <Button onClick={() => history.push('/seed')} size="small">Go to torrents</Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item xs={6} md={4}>
      <Card variant="outlined">
        <CardContent className={classes.tilesContentWrapper}>
          <Typography sx={{ fontSize: 14 }} gutterBottom variant="subtitle2">
            Number of torrents producing upload
          </Typography>
          <Typography variant="h5" component="div">
            {torrentWithUploadSpeed}
          </Typography>
        </CardContent>
        <CardActions className={classes.tilesContentWrapper}>
          <Button onClick={() => history.push('/seed')} size="small">Go to torrents</Button>
        </CardActions>
      </Card>
    </Grid>
  </Grid>
}


interface Props {
}

const Dashboard: React.FC<Props> = () => {
  const classes = useStyles()

  React.useEffect(() => { document.title = "JOAL - Dashboard" }, [])

  return (
    <PageLayout>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <ClientDescriptionCard />
          </Grid>
        </Grid>

        <TorrentCards />

        <Grid container>
          <Grid item xs={3}>
            overall upload speed
          </Grid>
          <Grid item xs={3}>
            amout of seed generated in 1 hour ()
          </Grid>
          <Grid item xs={3}>
            ratio calculator (input= down, seed) output = how many percent in 1 hour
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  )
}



export default Dashboard
