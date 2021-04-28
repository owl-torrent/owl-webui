import React from 'react'
import { Container, Grid, Typography} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TorrentTable from '../components/torrents/table'
import { globalSelectors } from '../features/api'
import { useSelector } from 'react-redux'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2)
    },
    
  }),
)


interface Props {
}

const Seed: React.FC<Props> = () => {
  const classes = useStyles()
  const seedStarted = useSelector(globalSelectors.selectIsSeedStarted)

  React.useEffect(() => { document.title = "JOAL - Torrents" }, [])

  if (!seedStarted) {
    return <Container disableGutters maxWidth="xl" className={classes.root}>
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h5">You need to start seeding in order to see your torrents</Typography>
      </Grid>
    </Grid>
  </Container>
  }

  return <Container disableGutters maxWidth="xl" className={classes.root}>
    <Grid container>
      <Grid item xs={12}>
        <TorrentTable />
      </Grid>
    </Grid>
  </Container>
}

export default Seed
