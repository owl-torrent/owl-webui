import React from 'react'
import Grid from '@material-ui/core/Grid'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import PageLayout from '../layouts/default.layout'
import Container from '@material-ui/core/Container'
import { useSelector } from 'react-redux'
import { globalSelectors } from '../features/api/global.slice'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3)
    },
  }),
)


interface Props {
}

const Dashboard: React.FC<Props> = () => {
  const classes = useStyles()
  const isConnected = useSelector(globalSelectors.selectIsSeedStarted)

  return (
    <PageLayout>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            dashboard page
          </Grid>
          <Grid item xs={12}>
            connected : {Boolean(isConnected).toString()}
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  )
}



export default Dashboard
