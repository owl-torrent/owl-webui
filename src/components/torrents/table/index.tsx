import React from 'react'
import { Grid } from '@material-ui/core'
import TableBody from './table-body'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) => createStyles({
    torrentFilters: {
      [theme.breakpoints.up('md')]: {
        maxWidth: 220
      }
    },
    tableBody: {
      height: `calc(95vh - (${theme.mixins.toolbar.minHeight}px + 16px))`, // substract toolbar height + mainContent marginTop
      minHeight: 400,
    },
  }),
)

const TorrentTable: React.FC = () => {
  const classes = useStyles()

  return <Grid container spacing={0}>
    <Grid item className={classes.torrentFilters} xs={12} sx={{bgcolor: 'red'}}>
      <div>categories filters goes here</div>
      <div>---------</div>
      <div>list of all trackers goes below (click on a tracker to filter all torrent that seeds on this tracker</div>
    </Grid>
    <Grid item xs className={classes.tableBody}>
      <TableBody />
    </Grid>
  </Grid>
}

export default TorrentTable
